$(document).ready(function(){

	createTable()
	
	function createTable(){
		var index = 1;
		$('#withdrawtable').DataTable({
			"ajax": "../AgentSystem/AgentWithdraw?transaction=withdrawrequestjson",
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
		         		return (data == undefined ? '': commaSeparateNumber(data));
		         	}},
		         	{ "data": "dateProcessed", render : function(data, type, full, meta){
		         		return (data == undefined ? '': getFormattedDate(data));
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
	
	$(document).on("click","#withdrawmodal", function(){
		$('#withdraw').modal({
			keyboard: false,
			backdrop: 'static',
		})
		
		$('#submitwithdrawrequestbtn').removeAttr('disabled');
		$('#modalwithdrawamount').val('');
		$('#modalwithdrawpassword').val('');
		$('#modalbankaccountname').val('');
		$('#modalbankaccount').val('');
		$('#modalbankbranch').val('');
		
		$('#enterbankname').empty();
		
		$.ajax({
			  type: "POST",
			  url: 'AgentBanks',
			  data: {'username':loginagent, 
				  'transaction':'bankbyagent'},
			  success: function(data){
				  $('#agentbanklist').empty();
				  var data = $.parseJSON(data);
				  $.each(data.agentbanks, function( index, element ) {
					  if(index == 0){
						  $('#modalbankaccountname').val(element.bankHolder);
						  $('#modalbankaccount').val(element.bankAccount);
						  $('#modalbankname').val(element.bankName);
						  $('#modalbankbranch').val(element.bankBranch);
					  }
					  $('#agentbanklist').append('<option value="'+element.bankName+'" data-bankbranch="'+element.bankBranch+'" data-bankaccount="'+element.bankAccount+'" data-bankholder="'+element.bankHolder+'" data-bankname="'+element.bankName+'"> '+element.bankName+'</option>');
	  			  })
	  			  
				  if(data.agentbanks.length == 0){
				      $('#withdrawbankdiv').css('display','none');
					  $('#enterbankname').append('<div class="form-group">'+
					    '<label for="" class="col-sm-3 control-label">'+ENTERBANKNAME+' :</label>'+
					    '<div class="col-sm-9">'+
					      '<input type="text" class="form-control" id="enteredbankname" placeholder="">'+
					    '</div>'+
					  '</div>');
				  }else{
					  $('#agentbanklist').append('<option value="Others">'+OTHERS+'</option>');
				  }
	  			  $('#modalcurrency').text(data.agents.currency.currency);
				  $('#modabalance').text(commaSeparateNumber(data.agents.balance));
	  			 
			  }
		});
	});
	
	$(document).on("change","#agentbanklist", function(){
		var agentselectedbank = $('#agentbanklist :selected').val();
		$('#enterbankname').empty();
		if(agentselectedbank == 'Others'){
			$('#enterbankname').append('<div class="form-group">'+
		    '<label for="" class="col-sm-3 control-label">'+ENTERBANKNAME+' :</label>'+
		    '<div class="col-sm-9">'+
		      '<input type="text" class="form-control" id="enteredbankname" placeholder="">'+
		    '</div>'+
		  '</div>');
			
			$('#modalbankaccountname').val('');
			$('#modalbankaccount').val('');
			$('#modalbankname').val('');
			$('#modalbankbranch').val('');
			
		}else{
			var agentbankbranch = $('#agentbanklist :selected').data('bankbranch');
			var bankaccount = $('#agentbanklist :selected').data('bankaccount');
			var bankholder = $('#agentbanklist :selected').data('bankholder');
			var bankname = $('#agentbanklist :selected').data('bankname');
			
			$('#modalbankaccountname').val(bankholder);
			$('#modalbankaccount').val(bankaccount);
			$('#modalbankname').val(bankname);
			$('#modalbankbranch').val(agentbankbranch);
			
			
			console.log(agentbankbranch+'asdasdsa'+agentselectedbank+bankname+bankholder);
		}
	});
	
	//================================================================================================================================
	// validation withdraw amount if exist to balance
	//================================================================================================================================
	
	$(document).on("keyup","#modalwithdrawamount", function(){
		var withdrawamount = $(this).val();
		var remainingbalance = $('#modabalance').text().replace(',','').replace(',','').replace(',','').replace(',','').replace(',','');
		$('#withdrawmessages').empty();
		if(parseFloat(withdrawamount) > parseFloat(remainingbalance)){
			swal(
			  'Error!',
			  'Withdraw amount is exceed to your balance. Please enter correct amount.',
			  'error'
			)
		}
	});
	
	//================================================================================================================================
	// submit withdraw request
	//================================================================================================================================
	
	$(document).on("click","#submitwithdrawrequestbtn", function(){
		var modalbankaccountname = $('#modalbankaccountname').val();
		var modalbankaccount = $('#modalbankaccount').val();
		var modalbankname = $('#modalbankname').val();
		var modalwithdrawamount = $('#modalwithdrawamount').val();
		var modalwithdrawpassword = $('#modalwithdrawpassword').val();
		var enteredbankname = $('#enteredbankname').val();
		var modalbankbranch = $('#modalbankbranch').val();
		if(enteredbankname == undefined){
			enteredbankname = $('#agentbanklist :selected').val();
			
		}
		
		
		$('#withdrawmessages').empty();
		
		$.ajax({
			type: "POST",
			url: 'AgentWithdraw',
			data: {'username':loginagent, 
				'bankaccountname':modalbankaccountname,
				'bankaccount':modalbankaccount,
				'withdrawamount':modalwithdrawamount,
				'withdrawpassword':modalwithdrawpassword,
				'enteredbankname':enteredbankname,
				'modalbankbranch':modalbankbranch,
				'agenttype':'agents',
				'transaction':'withdrawrequest',
				},
			success: function(data){
//				  console.log(data);
				  if(data == 'success_bank_not_exist'){
					  
					  $('#withdraw').modal('toggle');
					  openConfirmationAlert(
							  modalbankaccountname, 
							  modalbankaccount, 
							  modalwithdrawamount, 
							  enteredbankname, 
							  modalbankbranch							  
							  );
				  }else if(data == 'success_bank_exist'){
					  $('#withdraw').modal('toggle');
					  swal(
						  'Success!',
						  'Successfully sent withdraw request!',
						  'success'
						)
				  }else if(data == 'empty_field'){
					  swal(ERROR, SOMEFIELDSAREMETPY,'error');
				  }else if(data == 'withdraw_password_not_set'){
					  swal(ERROR, PINNOTSETSETUPFIRST,'error');
				  }else if(data == 'invalid_withdraw_password'){
					  swal(ERROR, INVALIDPIN,'error');
				  }else if(data == 'not_enough_balance'){
					  swal(ERROR, NOTENOUGHBALANCEFOROPERATION,'error');
				  }else if(data == 'invalid_withdraw_amount'){
					  swal(ERROR, INVALIDWITHDRAWAMOUNT,'error');
				  }
				  createTable()
			}
		});
		
		
	});
	
	function openConfirmationAlert(
		  modalbankaccountname, 
		  modalbankaccount,  
		  modalwithdrawamount, 
		  enteredbankname, 
		  modalbankbranch	
		){
		swal({
			  title: 'Your withdraw request successfully sent!',
			  text:  'Do you want to save your bank information?',
			  type:  'info',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes, Save it!',
			  cancelButtonText: 'No, Cancel saving!',
			  confirmButtonClass: 'btn btn-success',
			  cancelButtonClass: 'btn btn-danger',
			  buttonsStyling: false
			}).then(function(isConfirm) {
			  if (isConfirm === true) {
				  
				  sendAvailabilityStatus(
					  modalbankaccountname, 
					  modalbankaccount, 
					  enteredbankname, 
					  modalwithdrawamount, 
					  modalbankbranch	
				  );
			    
			  } else if (isConfirm === false) {
				  location.reload();
			  }
		})

	}
	
	function sendAvailabilityStatus(
		  bankaccountname, 
		  bankaccount, 
		  bankname, 
		  withdrawamount, 
		  bankbranch	
		){
		$.ajax({
	  		type: "POST",
	  		url: '../AgentSystem/AgentBanks',
	  		data: {
	  				'transaction':'addbanks', 
	  				'bankaccountname':bankaccountname, 
	  				'bankaccount':bankaccount, 
	  				'bankname':bankname,
	  				'withdrawamount':withdrawamount, 
	  				'bankbranch':bankbranch
	  			  },
	  		success: function(data){
	  			if(data == 'addsuccess'){
	  				swal(
  				      	'Success',
  				      	'Bank information successfully added',
  				      	'success'
  				    );
	  				setInterval(function() {
	  					location.reload();
	  				}, 2000);
	  			} else{
	  				swal(
    				    'Error',
    				    'An error has occured during adding new banks',
    				    'error'
    				);
	  				setInterval(function() {
	  					location.reload();
	  				}, 2000);
  	  			}
	  			createTable();
	  		  }
		})
	}
	
	
	function commaSeparateNumber(val){
	    while (/(\d+)(\d{3})/.test(val.toString())){
	      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
	    }
	    return val;
	}
	
	function getFormattedDate(date) {
    	var now = new Date(date);
    	return now.format("yyyy-mm-dd HH:mm:ss");
    }
	
	
	$('#modalwithdrawamount, #modalbankaccount, #modalwithdrawpassword').keypress(function(key) {
    	// Allow only backspace and delete
    	if(key.charCode < 48 || key.charCode > 57) return false;
    });
});