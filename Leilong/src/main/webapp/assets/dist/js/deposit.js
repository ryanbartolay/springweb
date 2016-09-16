$(document).ready(function(){
	
	
	createTable()
	
	
	function createTable(){
		var index = 1;
		$('#deposittable').DataTable({
			"ajax": "../AgentSystem/AgentDeposit?transaction=depositrequestjson",
	    	"columns": [
		            { "data": "accountId", render : function(data, type, full, meta){
		         		return index++;
		         	}},
		         	{ "data": "agentId"},
		            { "data": "agentType", render : function(data, type, full, meta){
		            	if(data == 'agents'){
		            		return '<span class="label label-success">'+AGENT+'</span>';
		            	}
		            	return '<span class="label label-danger">'+PLAYER+'</span>';
		         	}},
		            { "data": "transactionNumber", render : function(data, type, full, meta){
		         		return (data == undefined ? '':data);
		         	}},
		         	{ "data": "dateAdded", render : function(data, type, full, meta){
		         		return (data == undefined ? '': getFormattedDate(data));
		         	}},
		         	{ "data": "amount", render : function(data, type, full, meta){
		         		return (data == undefined ? '': addThousandsSeparator(data));
		         	}},
		         	
		         	{ "data": "dateProcessed", render : function(data, type, full, meta){
		         		return (data == undefined ? '0': getFormattedDate(data));
		         	}},
		         	{ "data": "status", render : function(data, type, full, meta){
		         		if(data.status == 'Pending'){
		         			return PENDING;
		         		}else if(data.status == 'Validated'){
		         			return VALIDATED;
		         		}else if(data.status == 'Refused'){
		         			return REFUSED;
		         		}else{
		         			return VALIDATING;
		         		}	
		         	}},
		        ],
	        "paging": true,
	        "lengthChange": true,
	        "searching": true,
	        "ordering": true,
	        "info": true,
	        "autoWidth": true,
	        "destroy":true,
	        "iDisplayLength": 20,
	        "lengthMenu": [[20, 50, 500, -1], [20, 50, 500, "All"]],
	        
	        "language": {
	            "url": url
	        }
	        
	    });
	};
	

	
	$(document).on("click","#depositbutton", function(){
		$('#depositmodal').modal({
			keyboard: false,
			backdrop: 'static',
		})

		
		$('#deposit_message_modal').empty();
		
		$('#agentdepositbtn').removeAttr('disabled');
		$('#systembanklist').empty();
		$('#agentsBanks').empty();
		$('#modalbrankbranch').val('');
		$('#modalaccountname').val('');
		$('#modalaccountno').val('');
		$('#bank_name_selected').val('');
		$('#modalagentdepositamount').val('');
		
		$('#bank_address_div').css('display','none');
		$('#bank_account_number_div').css('display','none');
		$('#bank_account_name_div').css('display','none');
		$('#bill_number_div').css('display','none');
		$('#depositbankdiv').css('display','none');
		$('#enterbankname').css('display','none');
		$('#agent_note_message').css('display','none');
		
		
		$('#agentdepositbtn').css('display','none');
		$('#next_btn').css('display','none');
	});
	
	
	$( "#modalagentdepositamount" ).keyup(function( event ) {
		getBanksInformationBaseOnDepositAmount();
	}).keydown(function( event ) {
	  if ( event.which == 13 ) {
	    event.preventDefault();
	  }
	});
	
	
	function getBanksInformationBaseOnDepositAmount(){
		
		$('#modalbrankbranch').val('');
		$('#modalaccountname').val('');
		$('#modalaccountno').val('');
		$('#bank_name_selected').val('');
		
		$('#modalagentbankaddress').val('');
		$('#modalagentbankaccountno').val('');
		$('#modalagentbankaccountname').val('');
//		
//		$('#systembanklist').empty();
//		$('#agentsBanks').empty();
		
		$.ajax({
			  type: "POST",
			  url: '../SystemSettings/Banks',
			  data: {'username':loginagent, 
				  'transaction':'banksjson',
				  'amount':$('#modalagentdepositamount').val(),
				  'type':''},
			  success: function(data){
				  
				  console.log(data);
				  
				  $('#systembanklist').empty();
				  $('#agentsBanks').empty();
				  
				  var data = $.parseJSON(data);
				  $.each(data.banks, function( index, element ) {
					  
					  $('#systembanklist').append('<label class="col-sm-6" > '+
					  			'<input type="radio" name="r3" class="flat-red" data-accountholder="'+element.accountHolder+'" '+
					  			'data-bankaccount="'+element.bankAccount+'" data-bankbranch="'+element.bankBranch+'" data-bank-name="'+element.bankName+'">'+element.bankName+'</label>');
				  });
				  
				  if(data.banks.length == 0){
					  $('#systembanklist').append('<label>'+NOAVAILABLEBANKS+'</label>');
					  $('#next_btn').css('display','none');
				  }
				  
				  $.each(data.agentsBanks, function( index, element ) {
					  $('#enteredbankname').css('display', 'none');
					  
					  if(index == 0){
						  var account = String(element.bankAccount);
						  var res = account.substring(account.length-4, account.length);
						  
						  $('#modalagentbankaddress').val(element.bankBranch);
						  $('#modalagentbankaccountno').val(res);
						  $('#modalagentbankaccountname').val(element.bankHolder);
					  }
					  $('#agentsBanks').append('<option value="'+element.bankName+'" data-bankbranch="'+element.bankBranch+'"'+
						'data-bankaccount="'+element.bankAccount+'" data-bankholder="'+element.bankHolder+'" data-bankname="'+element.bankName+'">'+ 
						element.bankName+'</option>');
				  });
				  
				 
				  
				  if(data.agentsBanks.length == 0){
					  console.log("no banks");
					  console.log(data.agentsBanks);
					  
					  $('#agentsBanks').empty();
					  $('#enterbankname').empty();
					  
				      $('#depositbankdiv').css('display','none');
				      $('#agents_banks_div').css('display','none');

				      $('#agents_banks_label').css('display','none');
				      
				      
					  $('#enterbankname').append('<div class="form-group">'+
					    '<label for="" class="col-sm-3 control-label">Enter Bank Name :</label>'+
					    '<div class="col-sm-9">'+
					      '<input type="text" class="form-control" id="enteredbankname" placeholder="">'+
					    '</div>'+
					  '</div>');
				  }else{
					  $('#agentsBanks').append('<option value="Others">Others</option>');
				  }
			  }
			})
	}
	
	// ============================================================================================================================================================
	// triggered when select banks was change
	// ============================================================================================================================================================
	
	$(document).on("click", "#next_btn", function(){
		$('#bank_address_div').css('display','');
		$('#bank_account_number_div').css('display','');
		$('#bank_account_name_div').css('display','');
		$('#bill_number_div').css('display','');
		$('#depositbankdiv').css('display','');
		$('#enterbankname').css('display','');
		$('#agent_note_message').css('display','');
		$('#next_btn').css('display','none');
		$('#agentdepositbtn').css('display','');
	})
	
	
	$(document).on("change","#agentsBanks", function(){
		var agentselectedbank = $('#agentsBanks :selected').val();
		$('#enterbankname').empty();
		if(agentselectedbank == 'Others'){
			$('#enterbankname').append('<div class="form-group">'+
		    '<label for="" class="col-sm-3 control-label">Enter Bank Name :</label>'+
		    '<div class="col-sm-9">'+
		      '<input type="text" class="form-control" id="enteredbankname" placeholder="">'+
		    '</div>'+
		  '</div>');
			
			$('#modalagentbankaccountno').val('');
			$('#modalagentbankaccountname').val('');
			$('#modalagentbankaddress').val('');
			
		}else{
		
			var agentbankbranch = $('#agentsBanks :selected').data('bankbranch');
			var bankaccount = String($('#agentsBanks :selected').data('bankaccount'));
			var bankholder = $('#agentsBanks :selected').data('bankholder');
			var bankname = $('#agentsBanks :selected').val();
			
			var res = bankaccount.substring(bankaccount.length-4, bankaccount.length);
			
			$('#modalagentbankaccountname').val(bankholder);
			$('#modalagentbankaccountno').val(res);
			$('#modalbankname').val(bankname);
			$('#modalagentbankaddress').val(agentbankbranch);
		}
	});
	

	
	
	$(document).on("change",".flat-red", function(){		
		var accountholder = $(this).data('accountholder');
		var bankaccount = $(this).data('bankaccount');
		var bankbranch = $(this).data('bankbranch');
		var bankName = $(this).data('bank-name');
	
		console.log(bankaccount);
		
//		$('#agentdepositbtn').css('display','none');
		
		console.log($(this));
		$('#modalbrankbranch').val('sadsadasdsa');
		$('#modalaccountname').val(accountholder);
		$('#modalaccountno').val(bankaccount);
		$('#bank_name_selected').val(bankName);
		
		if($('#agentdepositbtn').css('display') == 'none'){
			$('#next_btn').css('display','');
		}else{
			$('#next_btn').css('display','none');
		}
	});
	
	
	// ============================================================================================================================================================
	// submit deposit request
	// ============================================================================================================================================================
	
	$(document).on("click","#agentdepositbtn", function(){
		// bank information
		var agentbankaddress = $('#modalagentbankaddress').val();
		var agentbankaccountno = $('#modalagentbankaccountno').val();
		var agentbankaccountname = $('#modalagentbankaccountname').val();
		var agentbankname = $('#enteredbankname').val();
		if(agentbankname == undefined){
			agentbankname = $('#agentsBanks :selected').val();
			
		}
		
		// operator banking informations
		var operatorbankname = $('#bank_name_selected').val();
		var operatorbrankbranch = $('#modalbrankbranch').val();
		var operatoraccountname = $('#modalaccountname').val();
		var operatoraccountno = $('#modalaccountno').val();
	
		
		var agentbillnumber = $('#modalbillbumber').val();
		var agentdepositamount = $('#modalagentdepositamount').val();
		
		/*if(agentbankaddress =='' || agentbankaccountno =='' || agentbankaccountname =='' || agentbankname =='' || operatorbankname =='' || operatorbrankbranch =='' || operatoraccountname =='' || operatoraccountno =='' || agentbillnumber =='' || agentdepositamount ==''){
			swal(ERROR, 'All fields are required.', 'error');
			return;
		}*/
		
		
		if(operatorbankname == ''){
			swal(ERROR, OPERATIONBANKNAMEISREQUIRED, 'error');
			return false;
		}
		
		//==========================================================================================================================================================
		// validate Operator bank branch 
		//==========================================================================================================================================================
		
		if(operatorbrankbranch == ''){
			swal(ERROR, OPERATIONBANKBRANCHISREQUIRED, 'error');
			return false;
		}
		
		//==========================================================================================================================================================
		// validate deposited amount entered 
		//==========================================================================================================================================================
		
		if(operatoraccountname == ''){
			swal(ERROR, OPERATIONBANKACCOUNTNAMEISREQUIRED, 'error');
			return false;
		}
		
		//==========================================================================================================================================================
		// validate deposited amount entered 
		//==========================================================================================================================================================
		
		if(operatoraccountno == ''){
			swal(ERROR, OPERATIONBANKACCOUNTNUMBERISREQUIRED, 'error');
			return false;
		}
		
		//==========================================================================================================================================================
		// player deposit bank name validations
		//==========================================================================================================================================================
		
		if(agentbankname == ''){
			swal(ERROR, PLAYBANKNAMEISREQUIRED, 'error');
			return false;
		}
		
		//==========================================================================================================================================================
		// player deposit bank address validations
		//==========================================================================================================================================================
		
		if(agentbankaddress == ''){
			swal(ERROR, PLAYERBANKADDRESS, 'error');
			return false;
		}
		
		//==========================================================================================================================================================
		// player deposit bank account validations
		//==========================================================================================================================================================
		
		if(agentbankaccountno == ''){
			swal(ERROR, PLAYERBANKACCOUNT, 'error');
			return false;
		}
		
		//==========================================================================================================================================================
		// player deposit bank name validations
		//==========================================================================================================================================================
		
		if(agentbankaccountname == ''){
			swal(ERROR, PLAYERBANKACCOUNTNAME, 'error');
			return false;
		}
		
		//==========================================================================================================================================================
		// validate deposited amount entered 
		//==========================================================================================================================================================
		
		if(agentbillnumber == ''){
			swal(ERROR, DEPOSITBILLNUMBERISREQUIRED, 'error');
			return false;
		}
		
		//==========================================================================================================================================================
		// validate deposited amount entered 
		//==========================================================================================================================================================
		if(!$.isNumeric(agentdepositamount) || agentdepositamount == ''){
			swal(ERROR, DEPOSITAMOUNTENTERED, 'error');
			return false;
		}
		
		
		//==========================================================================================================================================================
		// validate fee amount entered 
		//==========================================================================================================================================================
		
		if(!$.isNumeric(agentdepositamount) || agentdepositamount == ''){
			swal(ERROR, DEPOSITFEEAMOUNT, 'error');
			return false;
		}
		
		//==========================================================================================================================================================
		// send deposit request to admin
		//==========================================================================================================================================================

		
		$('#depositmodal').modal('toggle');
		$.ajax({
			type: "POST",
			url: 'AgentDeposit',
			data: {'username':loginagent, 
				'operatorbankname':operatorbankname,
				'operatorbrankbranch':operatorbrankbranch,
				'operatoraccountname':operatoraccountname,
				'operatoraccountno':operatoraccountno,
				'agentbankaddress':agentbankaddress,
				'agentbankaccountno':agentbankaccountno,
				'agentbankaccountname':agentbankaccountname,
				'agentbankname':agentbankname,
				'agentbillnumber':agentbillnumber,
				'agentdepositamount':agentdepositamount,
				'agenttype':'agents',
				'transaction':'depositrequest',
				},
			success: function(data){
				  if(data == 'success'){
					  swal(SUCCESS, DEPOSITREQUESTSENT, 'success');
					  setInterval(function() {
		  					location.reload();
		  				}, 2000);
				  }else if(data == 'invalid_fee_amount'){
					  swal(ERROR, DEPOSITFEEAMOUNT, 'error');
				  }else if(data == 'error'){
					  swal(ERROR, ANDERROHASOCCURED, 'error');
				  } else if(data == 'uservalid'){
					  swal(ERROR, INVALIDUSERNAME, 'error');
				  }else{
					  swal(SUCCESS, INTERNALSERVERERROR, 'success');
				  }
				  createTable();
			}
		});
	});
	
	function getFormattedDate(date) {
    	var now = new Date(date);
    	return now.format("yyyy-mm-dd HH:mm:ss");
    }
	
	function addThousandsSeparator(input) {
	    var output = input
	    if (parseFloat(input)) {
	        input = new String(input); // so you can perform string operations
	        var parts = input.split("."); // remove the decimal part
	        parts[0] = parts[0].split("").reverse().join("").replace(/(\d{3})(?!$)/g, "$1,").split("").reverse().join("");
	        output = parts.join(".");
	    }
	    return output;
	}
});