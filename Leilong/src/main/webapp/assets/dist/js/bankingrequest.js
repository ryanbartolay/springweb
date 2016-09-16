$(document).ready(function(){
	
	createTableSelectedRequest();
	createTableQueueRequest();
	
	function createTableSelectedRequest(){
		var index=1;
		var table = $('#bankrequesttablevalidating').DataTable({
			
			"ajax": "../BankingSystem/BankingRequest?transaction=validating",
	    	"columns": [
		            { "data": "id", render : function(data, type, full, meta){
		         		return index++;
		         	}},
		         	{"data": "agentId" },
		         	{"data": "agentType" },
		         	{"data": "transactionNumber" },
		            { "data": "dateAdded", render : function(data, type, full, meta){
		         		return getFormattedDate(data);
		         	}},
		            { "data": "transactionType" },
		            { "data": "amount", render : function(data, type, full, meta){
		         		return (data == undefined ? '':data);
		         	}},
		         	{ "data": "billNumber", render : function(data, type, full, meta){
		         		return (data == undefined) ? '' : data;
		         	}},
		         	{ "data": "transactionType", render : function(data, type, full, meta){
		         		return (data == 'Withdraw') ? '' : full.bankName;
		         	}},
		         	{ "data": "transactionType", render : function(data, type, full, meta){
		         		return (data == 'Withdraw') ? '' : full.accountHolder;
		         	}},
		         	{ "data": "transactionType", render : function(data, type, full, meta){
		         		return (data == 'Withdraw') ? '' : full.accountNumber;
		         	}},
		         	{ "data": "transactionType", render : function(data, type, full, meta){
		         		return (data == 'Withdraw') ? full.bankName : full.banks.bankName;
//		         		return data;
		         	}},
		         	{ "data": "transactionType", render : function(data, type, full, meta){
		         		return (data == 'Withdraw') ? full.accountHolder : full.banks.accountHolder;
		         	}},
		         	{ "data": "transactionType", render : function(data, type, full, meta){
		         		return (data == 'Withdraw') ? full.accountNumber : full.banks.bankAccount;
		         	}},
		         	{ "data": "currency.currency", render : function(data, type, full, meta){
		         		return (data);
		         	}},
		         	{ "data": "status.status", render : function(data, type, full, meta){
		         		if(data == 'Validating'){
		         			return VALIDATING;
		         		}return (data == undefined) ? '' : data;
		         		
		         	}},
		         	{ "data": "transactionType", render : function(data, type, full, meta){
		         		console.log(full);
		         		var billNumber = '';
		         		if(full.billNumber != undefined){
		         			billNumber = full.billNumber;
		         		}
		         		
		         		var bankName = (data == 'Withdraw') ? full.bankName : full.banks.bankName;
		         		
		         		return '<button class="btn btn-default btn-sm confirmrequestbtn" data-toggle="tooltip" data-placement="left" title="'+APPROVED+'" id="confirmrequestbtn_'+index+'" data-requestid="'+full.id+'" data-bankname="'+bankName+'" '+
			  			'data-accountnumber="'+full.accountNumber+'" data-agentid="'+full.agentId+'" data-billno="'+billNumber+'" data-amount="'+full.amount+'" '+
				  			'data-feeamount="'+full.feeAmount+'" data-transtype="'+full.transactionType+'" data-transactionnumber="'+full.transactionNumber+'" '+
				  			'data-operatoraccount="">'+
				  			'<i class="fa fa-pencil"></i> '+
				  		'</button> '+
				  		'<button class="btn btn-danger btn-sm refuserequestbtn " id="refuserequestbtn_'+index+'" data-toggle="tooltip" data-placement="left" title="'+REFUSE+'" data-requestid="'+full.id+'" data-bankname="'+full.bankName+'" '+ 
				  			'data-dateadded="'+full.dateAdded+'" data-agentid="'+full.agentId+'" data-billno="'+full.billNumber+'" data-amount="'+full.amount+'" '+
				  			'data-feeamount="'+full.feeAmount+'" data-transtype="'+full.transactionType+'" data-transactionnumber="'+full.transactionNumber+'"> '+
				  			'<i class="fa fa-trash"></i>'+
				  		'</button>';
		         	}},
		        ],
			
			
	        "paging": true,
	        "lengthChange": true,
	        "searching": true,
	        "ordering": true,
	        "info": true,
	        "autoWidth": true,
	        "scrollX": true,
	        "destroy":true,
	        "iDisplayLength": 50,
	        "lengthMenu": [[50, 150, 500, -1], [50, 150, 500, "All"]],
	        
	        "language": {
	            "url": url
	        },
	
	    });
	}
	
	
	
	function createTableQueueRequest(){
		var index = 1;
		$('#bankrequesttablequeue').DataTable({
			
			"ajax": "../BankingSystem/BankingRequest?transaction=queue",
	    	"columns": [
		            { "data": "id", render : function(data, type, full, meta){
		         		return index++;
		         	}},
		         	{"data": "agentId" },
		         	{"data": "agentType" },
		         	{"data": "transactionNumber" },
		            { "data": "dateAdded", render : function(data, type, full, meta){
		         		return getFormattedDate(data);
		         	}},
		           
		            { "data": "amount", render : function(data, type, full, meta){
		         		return (data == undefined ? '':data);
		         	}},
		         	{ "data": "transactionType" },
		         	{ "data": "transactionType", render : function(data, type, full, meta){
		         		return '<button class="btn btn-success btn-sm selectbtn" name="selectbtn" data-toggle="tooltip" data-placement="left" title="'+SELECT+'" data-requestid="'+full.id+'" data-transactionnumber="'+full.transactionNumber+'" data-agentid="'+full.agentId+'">'+
				  		'<i class="fa fa-check"></i></button> ';
		         	}},
		        ],
			
	        "paging": true,
	        "lengthChange": true,
	        "searching": true,
	        "ordering": true,
	        "info": true,
	        "autoWidth": false,
	        "destroy":true,
	        "iDisplayLength": 50,
	        "lengthMenu": [[50, 150, 500, -1], [50, 150, 500, "All"]],
	        
	        "language": {
	            "url": url
	        },
	        
	    });
	}
	
	$(document).on("click",".bank-request-selected-data", function(){
		createTableSelectedRequest();
	})
	
	$(document).on("click",".bank-request-queue-data", function(){
		createTableQueueRequest();
	})
	
	$(document).on("click",".selectbtn", function(){
		var requestid = $(this).data('requestid');
		var transactionnumber = $(this).data('transactionnumber');
		var agentid = $(this).data('agentid');
		
		$.ajax({
  		  type: "POST",
  		  url: 'BankingRequest',
  		  data: {'requestid':requestid, 
  			  'transactionnumber':transactionnumber,
  			  'agentid':agentid,
  			  'transaction':'select'},
  		  success: function(data){
  			  console.log(data);

  			  createTableSelectedRequest();
  			  createTableQueueRequest();
  			  
  		  }
		});
	});
	
	$(document).on("click",".confirmrequestbtn", function(){
		var target_row = $(this).parent().parent().attr('id');
		
		console.log($(this));
		
		var requestid = $(this).data('requestid');
		var bankname = $(this).data('bankname');
		var accountnumber = $(this).data('accountnumber');
		var agentid = $(this).data('agentid');
		var billno = $(this).data('billno');
		var amount = $(this).data('amount');
		var feeamount = $(this).data('feeamount');
		var transtype = $(this).data('transtype');
		var transactionnumber = $(this).data('transactionnumber');
		var operatoraccount = $(this).data('bankname');
	
		$('#processmessage').empty();
		$('#bankingrequestmodal').modal({
			keyboard: false,
			backdrop: 'static',
		}).data('target-id', target_row)
		
		$('#agentidmodal').val(agentid);
		$('#requestidmodal').val(requestid);
		$('#transactionnumbermodal').val(transactionnumber);
		$('#transtypemodal').val(transtype);
		$('#banknamemodal').val(bankname);
		$('#daterequestmodal').val(accountnumber);
		$('#amountmodal').val(amount);
		$('#billnomodal').val(billno);
		$('#feeamountmodal').val(feeamount);
		$('#confirmbankingrequestbtn').removeAttr('disabled');
		
		$('#operatorbanksdiv').empty();
		if(transtype == 'Withdraw'){
			$('#billnomodal').removeAttr('readonly');
			
			$.ajax({
				  type: "POST",
				  url: '../SystemSettings/Banks',
				  data: {'username':'', 
					  'transaction':'banksjson',
					  'amount':amount},
				  success: function(data){
					  console.log(data);
					  var data = $.parseJSON(data);
					  
					  var tmp = "";
					  $.each(data.banks, function( index, element ) {
						  tmp = tmp+'<option value="'+element.id+'" data-accountholder="'+element.accountHolder+'" '+
						  			'data-bankaccount="'+element.bankAccount+'" data-bankbranch="'+element.bankBranch+'" >'+element.bankName+'</option>';
					  });
					  $('#operatorbanksdiv').append('<label for="operatorbankslabel" id="operatorbankslabel">'+OPERATORBANKS+'</label><select class="form-control" id="operatorbanks">'+tmp+'</select>');
				  }
			});
		}else{
			$('#billnomodal').attr('readonly','readonly');
			$('#operatorbanksdiv').append('<label for="operatorbankslabel" id="operatorbankslabel">'+OPERATORBANKS+'</label>'+
					'<input type="text" class="form-control" id="operatoraccount" placeholder="" readonly="readonly" value="'+operatoraccount+'">');
		}
	});
	
	
	$(document).on("click","#confirmbankingrequestbtn", function(){
		var transactionnumbermodal = $('#transactionnumbermodal').val();
		var requestidmodal = $('#requestidmodal').val();
		var agentidmodal = $('#agentidmodal').val();
		var transtypemodal = $('#transtypemodal').val();
		var billnomodal = $('#billnomodal').val();
		
		var operatorbanks = $('#operatorbanks :selected').val();
		
		if(operatorbanks == undefined){
			operatorbanks = 0;
		}
		
				
		$('#processmessage').empty();
		var target_id = $(this).parent().parent().parent().parent().data('target-id');
		
		$.ajax({
  		  	type: "POST",
  		  	url: 'BankingRequest',
  		  	data: {'transactionnumber':transactionnumbermodal, 
  		  		'requestid':requestidmodal,
  		  		'agentid':agentidmodal,
  		  		'operatorbanks':operatorbanks,
  		  		'billnumber':billnomodal,
  		  		'transaction':'confirm'},
  		  	success: function(data){
  		  		if(data == 'pending_amount_not_enough'){
  		  			swal(ERROR, PENDINGAMOUNTNOTENOUGH, "error");
  		  			$("#bankingrequestmodal").modal('hide'); 
  		  		}else if(data == 'request_not_exist_or_done'){
  		  			swal(ERROR, REQUESTNOTEXIST, "error");
		  			$("#bankingrequestmodal").modal('hide'); 
  		  		}else if(data == 'success'){
  		  			swal(SUCCESS, BANKREQUESTSUCCESSPROCESSED, "success");
		  			$("#bankingrequestmodal").modal('hide'); 
  		  		}else if(data == 'no_permission'){
	  		  		swal(ERROR, NOPERMISSIONBANKING, "error");
		  			$("#bankingrequestmodal").modal('hide'); 
  		  		}else{
	  		  		swal(ERROR, INTERNALSERVERERROR, "error");
		  			$("#bankingrequestmodal").modal('hide'); 
  		  		}
  		  		
  		  		
  		  		createTableSelectedRequest();
  		  		
  		  	}
		});
		
	});
	
	//===============================================================================================================================================
	// open refuse modal
	//===============================================================================================================================================
	
	$(document).on("click",".refuserequestbtn", function(){

		$('#bankingrequestrefusemodal').modal({
			keyboard: false,
			backdrop: 'static'
		})
		console.log('click');
		
		var requestid = $(this).data('requestid');
		$('#refuserequestidmodal').val(requestid);
		$('#transactionnumberrefuse').val($(this).data('transactionnumber'));
		$('#agentid').val($(this).data('agentid'));
	});
	
	//===============================================================================================================================================
	// process refuse confirmations
	//===============================================================================================================================================
	
	$(document).on("click","#refuseconfirmbutton", function(){
		var refuserequestidmodal = $('#refuserequestidmodal').val();
		var refusereasonsmessage = $('#refusereasonsmessage').val();
		var transactionnumberrefuse = $('#transactionnumberrefuse').val();
		var reasonsmodal = $('#reasonsmodal :selected').val();
		var agentid = $('#agentid').val();
		$('#processmessagerefuse').empty();
		$.ajax({
  		  	type: "POST",
  		  	url: 'BankingRequest',
  		  	data: {'refuserequestidmodal':refuserequestidmodal, 
  		  		'refusereasonsmessage':refusereasonsmessage,
  		  		'transactionnumberrefuse':transactionnumberrefuse,
  		  		'reasonsmodal':reasonsmodal,
  		  		'agentid':agentid,
  		  		'transaction':'refused'},
  		  	beforeSend : function() {
				
			},
  		  	success: function(data){
  		  		console.log(data);
  		  		if(data == 'pending_amount_not_enough'){
  		  			swal("Error!", "Pending amount is not enough.", "error");
		  			$("#bankingrequestrefusemodal").modal('hide'); 
		  		}else if(data == 'request_not_exist_or_done'){
		  			swal("Error!", "Request does not exist or already processed.", "error");
		  			$("#bankingrequestrefusemodal").modal('hide'); 
		  		}else if(data == 'success'){
		  			swal("Success!", "Banking request successfully processed.", "success");
		  			$("#bankingrequestrefusemodal").modal('hide'); 
		  		}else if(data == 'SelectReason'){
		  			swal("Error!", "Reason is required.", "error");
		  		}else if(data == 'Others'){
		  			swal("Error!", "Reason's message is required.", "error");
		  		}else if(data == 'no_permission'){
		  			swal("Error!", "You don't have permission to refused banking request.", "error");
		  			$("#bankingrequestrefusemodal").modal('hide'); 
		  		}else{
		  			swal("Error!", "Internal server error.", "error");
		  			$("#bankingrequestrefusemodal").modal('hide'); 
		  		}
  		  		
  		  		createTableSelectedRequest();
  		  	}
		});
		console.log(refusereasonsmessage+" "+refuserequestidmodal+transactionnumberrefuse);
		
	});
	
	//===============================================================================================================================================
	// change message once message reason change
	//===============================================================================================================================================
	
	$(document).on("click","#reasonsmodal", function(){
		var reasonsMessage = $(this).find(':selected').data('message');
		$('#refusereasonsmessage').val(reasonsMessage);
		console.log(reasonsMessage);
	});
	
	function getFormattedDate(date) {
    	var now = new Date(date);
    	return now.format("yyyy-mm-dd HH:mm:ss");
    }
	
});