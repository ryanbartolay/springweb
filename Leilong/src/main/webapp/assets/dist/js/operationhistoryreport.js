$(document).ready(function(){

	 var date = new Date();
	 $("#datetimepicker_start").val(returnCurrentDate()+' 00:00:00');
	 $("#datetimepicker_end").val(returnCurrentDate() +' 23:59:59');
	 
	 $('#datetimepicker_start, #datetimepicker_end').daterangepicker({
		timePicker: true, 
		timePickerIncrement: 1, 
		timePicker24Hour: true,
		format: 'YYYY-MM-DD HH:mm:ss',
		singleDatePicker: true,
 	    showDropdowns: true,
 	    
 	    timePickerSeconds: true,
 	    
	});
	
	function returnCurrentDate() {
		var fullDate = new Date();
		var twoDigitMonth = ((fullDate.getMonth().toString().length) == 1)? '0'+(fullDate.getMonth()+1) : (fullDate.getMonth()+1);
		var twoDigitDate = ((fullDate.getDate().toString().length) == 1)? '0'+(fullDate.getDate()) : (fullDate.getDate());
		var currentDate = fullDate.getFullYear()+'-' + twoDigitMonth + "-" +twoDigitDate; 
		return currentDate;
     }
	
	createTable();
	createAgentTable();
	
	function createTable(){
		
		var startDate 	= $('#datetimepicker_start').val();
		var endDate 	= $('#datetimepicker_end').val();
		var transactionNumber 	= $('#transasction_number_search').val();
		var agentId 	= $('#agent_id_search').val();
		
		var index = 1;
		$('#playerOperationsHistoryTable').DataTable({
			"ajax": "../AgentSystem/AgentOperationHistory?transaction=players&startDate="+startDate+"&endDate="+endDate+"&transactionNumber="+transactionNumber+"&agentId="+agentId,
			"columns": [
	            { "data": "username", render : function(data, type, full, meta){
	         		return index++;
	         	}},
	         	{ "data": "username" },
	            { "data": "transactionNumber" },
	            { "data": "dateStart" , render : function(data, type, full, meta){
	            	return data == undefined ? '' : getFormattedDate(data);
	            }},
	         	{ "data": "amount" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},
	         	{ "data": "totalAdd" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},
	         	{ "data": "totalTransfer" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},
	         	{ "data": "totalNumber" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},
	    	         	
	         	{ "data": "validBet" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},
	         	
	         	{ "data": "winloss" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},

	         	{ "data": "commission" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},
	         	
	         	{ "data": "mainAgentCommission" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data)+' %';
	         	}},
	         	
	         	{ "data": "agentCommission" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},
	         	{ "data": "username", render : function(data, type, full, meta){
	         		return ' <a class="btn btn-warning btn-sm view-operations-modal" data-toggle="tooltip" data-placement="left" title=""  data-original-title="'+VIEW+'" data-transaction-number="'+full.transactionNumber+'"><i class="fa fa-eye"></i></a>';
	         	}}
		     ],
	        "paging": true,
	        "lengthChange": false,
	        "searching": false,
	        "ordering": true,
	        "info": true,
	        "autoWidth": true,
	        "destroy":true,
	        "iDisplayLength": 15,
	        "lengthMenu": [[15, 50, 500, -1], [15, 50, 500, "All"]],
	        
	        "language": {
	            "url": url
	        }
		
	    });
	};
	
	
	function createAgentTable(){
		var startDate 	= $('#datetimepicker_start').val();
		var endDate 	= $('#datetimepicker_end').val();
		var transactionNumber 	= $('#transasction_number_search').val();
		var agentId 	= $('#agent_id_search').val();
		
		var index = 1;
		$('#agentOperationsHistoryTable').DataTable({
			"ajax": "../AgentSystem/AgentOperationHistory?transaction=subagents&startDate="+startDate+"&endDate="+endDate+"&transactionNumber="+transactionNumber+"&agentId="+agentId,
			"columns": [
	            { "data": "username", render : function(data, type, full, meta){
	         		return index++;
	         	}},
	         	/*{ "data": "username" },*/
	         	{ "data": "parentAgent" },
	            { "data": "transactionNumber" },
	            { "data": "dateStart" , render : function(data, type, full, meta){
	            	return data == undefined ? '' : getFormattedDate(data);
	            }},
	         	{ "data": "amount" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},
	         	{ "data": "totalAdd" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},
	         	{ "data": "totalTransfer" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},
	         	{ "data": "totalNumber" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},
	         	{ "data": "validBet" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},
	         	{ "data": "winloss" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},
	         	{ "data": "commission" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},
	        	{ "data": "mainAgentCommission" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data)+' %';
	         	}},
	        	{ "data": "agentCommission" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},
	         	{ "data": "username", render : function(data, type, full, meta){
	         		return ' <a class="btn btn-warning btn-sm view-operations-modal" data-toggle="tooltip" data-placement="left" title=""  data-original-title="'+VIEW+'" data-transaction-number="'+full.transactionNumber+'"><i class="fa fa-eye"></i></a>';
	         	}}
		     ],
	        "paging": true,
	        "lengthChange": false,
	        "searching": false,
	        "ordering": true,
	        "info": true,
	        "autoWidth": true,
	        "destroy":true,
	        "iDisplayLength": 15,
	        "lengthMenu": [[15, 50, 500, -1], [15, 50, 500, "All"]],
	        
	        "language": {
	            "url": url
	        }
	    });
	};
	

	//======================================================================================================================================================
	// get operations data base on transaction numbers and display on modal
	//======================================================================================================================================================
	var transactionnumber = "";
	$(document).on("click",".view-operations-modal", function(){
		//======================================================================================================================================================
		// open modal
		//======================================================================================================================================================
		$('#operation_detailed_modal').modal({
			keyboard: false,
			backdrop: 'static',
		})
		
		transactionnumber = $(this).data('transaction-number');
		
		//======================================================================================================================================================
		// get operations data and initialize datatables
		//======================================================================================================================================================
		
//		initializeDatatables()
		
		$("#start_data").prop('checked', 'checked');
		$("#add_data").prop('checked', 'checked');
		$("#transfer_data").prop('checked', 'checked');
		$("#record_data").prop('checked', 'checked');
		$("#end_data").prop('checked', 'checked');
		$("#subtract_data").prop('checked', 'checked');
		
		getOperationData(transactionnumber, 1, 1, 1, 1, 1, 1);
		
		
	})
	
	$(document).on('click','#start_data, #add_data, #transfer_data, #record_data, #end_data', function(){
		
		var startData = ($('#start_data:checkbox:checked').length > 0) ? 1 : 0;
		var addData = ($('#add_data:checkbox:checked').length > 0) ? 1 : 0;
		var transferData = ($('#transfer_data:checkbox:checked').length > 0) ? 1 : 0;
		var recordData = ($('#record_data:checkbox:checked').length > 0) ? 1 : 0;
		var endData = ($('#end_data:checkbox:checked').length > 0) ? 1 : 0;
		var subtractData = ($('#subtract_data:checkbox:checked').length > 0) ? 1 : 0;
		
		console.log(transactionnumber+startData);
		
		getOperationData(transactionnumber, startData, addData, transferData, recordData, endData, subtractData);
	})
	
	function getOperationData(transactionnumber, startData, addData, transferData, recordData, endData, subtractData){
		$.ajax({
			  type: "POST",
			  url: '../AgentSystem/AgentOperation',
			  data: {'transaction':'detailed_operations',
				  'transactionnumber':transactionnumber,
				  'startData':startData,
				  'addData':addData,
				  'transferData':transferData,
				  'recordData':recordData,
				  'endData':endData,
				  'subtractData':subtractData
				  },
			  success: function(data){
				  var data = $.parseJSON(data);
				  $('#operations_history_detailed tbody').empty();
				  var indexdata = 1;
				  $.each(data, function( index, element ) {
					  $('#operations_history_detailed tbody').append('<tr id="operation_'+element.operationNo+'">'+
					    '<td>'+ indexdata++ +'</td>'+
					  	'<td>'+element.agentId+'</td>'+
					  	'<td>'+element.operationNo+'</td>'+
					  	'<td>'+element.operationTypes+'</td>'+
					  	'<td>'+element.amount+'</td>'+
					  	'<td><span class="text-red">Cash : '+element.cashAmountBefore+'</span><br>Chips : '+element.chipsAmountBefore+'</td>'+
					  	'<td><span class="text-red">Cash : '+element.cashAmountAfter+'</span><br>Chips : '+element.chipsAmountAfter+'</td>'+
					  	'<td>'+element.creator+'</td>'+
					  	'<td>'+element.mobile+'</td>'+
					  	'<td>'+getFormattedDate(element.date)+'</td>'+
					  	'<td>'+element.status+'</td>'+
					  	'<td>'+
					  		'<a style = "display:'+(element.operationTypes == 'End' ? 'none' : 'none')+';" class="btn btn-success btn-sm '+(element.validated == false ? 'admin-approved':'')+'" data-toggle="tooltip" data-placement="left" title="" data-original-title="Approve" data-operation-number="'+element.operationNo+'" data-player-id="'+element.agentId+'"><i class="fa fa-thumbs-up"></i></a> '+
					  		'<a style = "display:'+(element.operationTypes == 'End' ? 'none' : 'none')+';" class="btn btn-success btn-sm '+(element.validated == false ? 'admin-update':'')+'" data-toggle="tooltip" data-placement="left" title="" data-original-title="Update" data-operation-number="'+element.operationNo+'" data-player-id="'+element.agentId+'"><i class="fa fa-edit"></i></a> '+
					  		'<a style = "display:'+(element.operationTypes == 'End' ? '' : '')+';" class="btn btn-success btn-sm '+(element.status == 'Validated'? '':'operation-approved')+'" data-toggle="tooltip" data-placement="left" title="" '+(element.status == 'Validating'? '':'disabled')+' data-original-title="Approve" data-operation-number="'+element.operationNo+'" data-player-id="'+element.agentId+'"><i class="fa fa-thumbs-up"></i></a> '+
						  	'<a style = "display:'+(element.operationTypes == 'End' ? '' : '')+';" class="btn btn-danger  btn-sm '+(element.status == 'Validated'? '':'operation-refused')+'" data-toggle="tooltip" data-placement="left" title="" '+(element.status == 'Validating'? '':'disabled')+' data-original-title="Refuse" data-operation-number="'+element.operationNo+'" data-player-id="'+element.agentId+'"><i class="fa fa-thumbs-down"></i></a></td>'+
						'</tr>');
					  
				  })
				  
			  	}
			});
	}
	
	//======================================================================================================================================================
	// get operations data and initialize datatables
	//======================================================================================================================================================
	
	function initializeDatatables(){
		$('.operations-history-detailed').DataTable({
	        "paging": true,
	        "lengthChange": true,
	        "searching": false,
	        "ordering": true,
	        "info": true,
	        "autoWidth": false,
	        "iDisplayLength": 15,
	        "lengthMenu": [[15, 25, 50, -1], [15, 25, 50, "All"]],
	        "destroy":true
		});
	}
	
	//======================================================================================================================================================
	// approved operation's request
	//======================================================================================================================================================
	
	$(document).on("click",".operation-approved", function(){
		
		$("#operation_detailed_modal").modal('hide'); 
		
		$('#approved_modal').modal({
			keyboard: false,
			backdrop: 'static',
		})
		
		var operationNumber = $(this).data('operation-number');
		var playerId = $(this).data('player-id');
		
		console.log(playerId);
		
		$('#approved_operation_number').val(operationNumber);
		$('#approved_player_id').val(playerId);
		$('#action_type').val('approved');
		$('#approved_operations_message').empty();
		$('#approved_proxy_agents_list').empty();
		$('#approved_proxy_agents_list').removeAttr('readonly');
		$.ajax({
			  type: "POST",
			  url: '../AgentSystem/AgentProxy',
			  data: {'transaction':'proxygsonlist'},
			  success: function(data){
				 var data = $.parseJSON(data);
				 console.log(data);
				 $('#approved_proxy_agents_list').append('<option value="--Select--">--Select Player--</option>');
				 $.each(data, function( index, element ) {
					 $('#approved_proxy_agents_list').append('<option value="'+element.proxyName+'">'+element.proxyName+'</option>');
				 });
			  }
		});

	});
	
	//======================================================================================================================================================
	// refuse operation's request
	//======================================================================================================================================================
	
	$(document).on("click",".operation-refused", function(){
		$("#operation_detailed_modal").modal('hide'); 
		
		$('#approved_modal').modal({
			keyboard: false,
			backdrop: 'static',
		})
		
		var operationNumber = $(this).data('operation-number');
		var playerId = $(this).data('player-id');
		$('#approved_operations_message').empty();
		$('#approved_operation_number').val(operationNumber);
		$('#approved_player_id').val(playerId);
		$('#action_type').val('refused');
		
		$('#approved_proxy_agents_list').empty();
		$('#approved_proxy_agents_list').append('<option value="">--Select Player--</option>');
		$('#approved_proxy_agents_list').attr('readonly','readonly');
	});
	
	//======================================================================================================================================================
	// refuse operation's request
	//======================================================================================================================================================
	
	$(document).on("click","#approved_submit_operations", function(){
		var operationNumber = $(this).data('operation-number');
		
		var operationNumber = $('#approved_operation_number').val();
		var playerId = $('#approved_player_id').val();
		var actionType = $('#action_type').val();
		var approvedMessage = $('#approved_message').val();
		var approvedProxy = $('#approved_proxy_agents_list :selected').val();
		
		$('#approved_operations_message').empty();
		
		if(actionType == 'approved' && approvedProxy == '--Select--'){
			swal("Error!", "Please select proxy name.", "error");
			return;
		}
		
		if(approvedMessage == ''){
			swal("Error!", "Message is required.", "error");
			return;
		}
		
		$.ajax({
			  type: "POST",
			  url: '../AgentSystem/AgentOperation',
			  data: {'transaction':'approvedrefuse',
				  'operationNumber':operationNumber,
				  'approvedMessage':approvedMessage,
				  'approvedProxy':approvedProxy,
				  'transType':actionType},
			  success: function(data){
				  console.log(data);
				  createTable();
				  if(data == 'invalid_transaction'){
					  swal("Error!", "Invalid transaction type.", "error");
					  $("#approved_modal").modal('hide'); 
				  }else if(data == 'approved_success'){
					  swal("Success!", "Operation successfully approved.", "success");
					  $("#approved_modal").modal('hide'); 
				  }else if(data == 'approved_error'){
					  swal("Error!", "Operation approval encountered an error.", "error");
					  $("#approved_modal").modal('hide'); 
				  }else if(data == 'refused_success'){
					  swal("Success!", "Operation successfully approved.", "success");
					  $("#approved_modal").modal('hide'); 
				  }else if(data == 'refused_error'){
					  swal("Error!", "Operation refuse encountered an error.", "error");
					  $("#approved_modal").modal('hide'); 
				  }
				  
			  }
		});
	});
	
	//======================================================================================================================================================
	// open modal for adding new operations(add, transfer and end operation)
	//======================================================================================================================================================
	
	$(document).on("click",".admin-new-operation-modal-btn", function(){
		$('#operation').modal({
			keyboard: false,
			backdrop: 'static',
		})
		
		
		
		var transactionNumber = $(this).data('transaction-number');
		var playerName = $(this).data('player-name');
		var providers = $(this).data('providers');
		
		console.log("playerName"+playerName);
		
		$('#providersdiv').empty();
		if(providers == 'OG'){
			$('#providersdiv').append('<label><input type="radio" name="providers" value="OG" checked> ORIENTAL GROUP</label><br>');
		}else{
			$('#providersdiv').append('<label><input type="radio" name="providers" value="FG" checked> FIRST CAGAYAN</label><br>');
		}
		
		$('#current_cash_amount_div').css('display','none');
		$('#current_chips_amount_div').css('display','none');
		$('#after_transfer_cash_div').css('display','none');
		$('#after_transfer_chips_div').css('display','none');
		$('#valid_bet_div').css('display','none');
		$('#winloss_amount_div').css('display','none');
		$('#table_number_div').css('display','none');
		$('#total_amount_div').css('display','none');
		
		$('#current_cash_amount').val('0');
		$('#current_chips_amount').val('0');
		$('#after_transfer_cash').val('0');
		$('#after_transfer_chips').val('0');
		$('#valid_bet_amount').val('0');
		$('#winloss_amount').val('0');
		$('#table_number').val('0');
		$('#total_amount').val('0');
		
		console.log(providers);
		
		$.ajax({
			  type: "POST",
			  url: '../AgentInformations',
			  data: {'transaction':'getbalanceinfo',
				  'playerName':playerName},
			  success: function(data){
				  var data = $.parseJSON(data);
				  
				  console.log(data);
				  
				  $('#transaction_number').val(transactionNumber);
				  $('#player_id').val(data.usersinfo.username);
				  $('#currenct_balance').val(data.usersinfo.balance);
				  $('#player_mobile').val(data.usersinfo.phone);
			  }
		});
		
		$('#new_proxy_agents_list').empty();
		$.ajax({
			  type: "POST",
			  url: '../AgentSystem/AgentProxy',
			  data: {'transaction':'proxygsonlist'},
			  success: function(data){
				 var data = $.parseJSON(data);
				 console.log(data);
				 $('#new_proxy_agents_list').append('<option value="--Select--">--Select Player--</option>');
				 $.each(data, function( index, element ) {
					 $('#new_proxy_agents_list').append('<option value="'+element.proxyName+'">'+element.proxyName+'</option>');
				 });
			  }
		});
	});
	
	$(document).on("click","#submit_new_operations", function(){
		 var transaction_number = $('#transaction_number').val();
		 var playerId = $('#player_id').val();
		 var currenctBalance = $('#currenct_balance').val();
		 var playerMobile = $('#player_mobile').val();
		 var additional_balance = $('#additional_balance').val();
		 var playerWithdrawPassword = $('#player_withdraw_password').val();
		 var operationType = $('#operation_types :selected').val();
		 var providers = $('input[name=providers]:checked').val();
		 
		 var currenctBalance = $('#currenct_balance').val();
		 var currentCashAmount = $('#current_cash_amount').val();
		 var currentChipsAmount = $('#current_chips_amount').val();
		 var afterTransferCash = $('#after_transfer_cash').val();
		 var afterTransferChips = $('#after_transfer_chips').val();
		 var validBet = $('#valid_bet_amount').val();
		 var winlossAmount = $('#winloss_amount').val();
		 var tableNumber = $('#table_number').val();
		 var totalAmount = $('#total_amount').val();
		 
		 console.log("currentCashAmount : "+currentCashAmount);
		 console.log("currentChipsAmount : "+currentChipsAmount);
		 console.log("afterTransferCash : "+afterTransferCash);
		 console.log("afterTransferChips : "+afterTransferChips);
		 console.log("validBet : "+validBet);
		 console.log("currenctBalance : "+currenctBalance);
		 
		 
		 $('#new_operations_message').empty();
		 $.ajax({
			  type: "POST",
			  url: '../AgentSystem/AgentOperation',
			  data: {'transaction':'addNewOperations',
				  'operationType':operationType,
				  'transactionNumber':transaction_number,
				  'playerMobile':playerMobile,
				  'additionalBalance':additional_balance,
				  'playerWithdrawPassword':playerWithdrawPassword,
				  'playerId':playerId,
				  'providers':providers,
				  'currenctBalance':currenctBalance,
				  'currentCashAmount':currentCashAmount,
				  'currentChipsAmount':currentChipsAmount,
				  'afterTransferCash':afterTransferCash,
				  'afterTransferChips':afterTransferChips,
				  'validBet':validBet,
				  'winlossAmount':winlossAmount,
				  'tableNumber':tableNumber,
				  'totalAmount':totalAmount
				  },
			  success: function(data){
				  	if(data == 'success'){
					  swal("Success!", "Successfully added new operation.", "success");
					  $("#operation").modal('hide'); 
					}else if(data =='invalid_player'){
						swal("Error!", "Invalid players.", "error");
					}else if(data =='invalid_withdraw_password'){
						swal("Error!", "Invalid PIN.", "error");
					}else if(data =='invalid_amount'){
						swal("Error!", "Invalid amount entered.", "error");
					}else{
						swal("Error!", "Internal server error.", "error");
						$("#operation").modal('hide'); 
					}
				  	createTable();
			  }
		});
		 
		 console.log(operation_types);
	});
	
	
	//===============================================================================================================================================
	// open new modal to create start operations
	//===============================================================================================================================================
	
	$(document).on("click",".admin-start-operation-modal-btn", function(){
		$('#start_operation').modal({
			keyboard: false,
			backdrop: 'static',
		})
		$('#start_players_list1').empty();
		$.ajax({
		  type: "POST",
		  url: '../AgentSystem/PlayersInformations',
		  data: {'transaction':'playersinformation'},
		  success: function(data){
			 var data = $.parseJSON(data);
			 
			 console.log(data);
			 
			 $('#start_players_list1').append('<option value="--Select--">--Select Player--</option>');
			 $.each(data, function( index, element ) {
				 console.log(element.phone);
				 
				 $('#start_players_list1').append('<option value="'+element.username+'" data-balance="'+element.balance+'" data-phone="'+element.contactPhone+'">'+element.username+'</option>');
			 });
		  }
		});
		
		$('#current_cash_amount').val('0');
		$('#current_chips_amount').val('0');
		$('#after_transfer_cash').val('0');
		$('#after_transfer_chips').val('0');
		$('#valid_bet_amount').val('0');
		$('#winloss_amount').val('0');
		$('#table_number').val('0');
		$('#total_amount').val('0');
		
		$('#proxy_agents_list').empty();
		$.ajax({
			  type: "POST",
			  url: '../AgentSystem/AgentProxy',
			  data: {'transaction':'proxygsonlist'},
			  success: function(data){
				 var data = $.parseJSON(data);
				 console.log(data);
				 $('#proxy_agents_list').append('<option value="--Select--">--Select Player--</option>');
				 $.each(data, function( index, element ) {
					 $('#proxy_agents_list').append('<option value="'+element.proxyName+'">'+element.proxyName+'</option>');
				 });
			  }
		});
	});
	
	//===============================================================================================================================================
	// submit modal form
	//===============================================================================================================================================
	
	$(document).on("click","#start_submit_new_operations", function(){
		var playerId 				= $("#start_players_list1 :selected").val();
		var currentBalance			= $("#start_currenct_balance").val();
		var amount 					= $("#start_additional_balance").val();
		var phone 					= $("#start_player_mobile").val();
		var withdrawPassword 		= $("#start_player_withdraw_password").val();
		$('#start_operations_message').empty();
		
		var providers = $('input[name=providers]:checked').val();
		
		$.ajax({
			  type: "POST",
			  url: '../AgentSystem/AgentOperation',
			  data: {'transaction':'addNewOperations',
			  		'operationType':'Start',
			  		'transactionNumber':'',
			  		'playerMobile':phone,
			  		'additionalBalance':amount,
			  		'playerWithdrawPassword':withdrawPassword,
			  		'playerId':playerId,
			  		'providers':providers,
			  		'currenctBalance':currentBalance,
			  		'currentCashAmount':'0',
			  		'currentChipsAmount':'0',
			  		'afterTransferCash':'0',
			  		'afterTransferChips':'0',
			  		'validBet':'0',
			  		'winlossAmount':'0',
			  		'tableNumber':'0',
			  		'totalAmount':'0'},
			  success: function(data){
				  
				  createTable();
				  if(data == 'success'){
						$('#start_operations_message').append('<div class="alert alert-success alert-dismissable">'+
		                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
		                    '<h4><i class="icon fa fa-check"></i> Alert!</h4>'+
		                    'Successfully added new operations.'+
		                  '</div>');
					}else if(data =='invalid_player'){
						$('#start_operations_message').append('<div class="alert alert-danger alert-dismissable">'+
		                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
		                    '<h4><i class="icon fa fa-ban"></i> Alert!</h4>'+
		                    'Invalid players.'+
		                  '</div>');
					}else if(data =='invalid_withdraw_password'){
						$('#start_operations_message').append('<div class="alert alert-danger alert-dismissable">'+
		                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
		                    '<h4><i class="icon fa fa-ban"></i> Alert!</h4>'+
		                    'Invalid withdraw password entered.'+
		                  '</div>');
					}else if(data =='invalid_amount'){
						$('#start_operations_message').append('<div class="alert alert-danger alert-dismissable">'+
		                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
		                    '<h4><i class="icon fa fa-ban"></i> Alert!</h4>'+
		                    'Invalid amount entered.'+
		                  '</div>');
					}else{
						$('#start_operations_message').append('<div class="alert alert-danger alert-dismissable">'+
		                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
		                    '<h4><i class="icon fa fa-ban"></i> Alert!</h4>'+
		                    'Internal server error.'+
		                  '</div>');
					}
			  }
		});
		
	});
	
	//===============================================================================================================================================
	// 
	//===============================================================================================================================================
	
	$(document).on("click",".revalidate", function(){
		var transactionNumber = $(this).data('transaction-number');
		
		$('#revalidation_modal').modal({
			keyboard: false,
			backdrop: 'static',
		})
		
		$.ajax({
			  type: "POST",
			  url: '../AgentSystem/AgentOperation',
			  data: {'transactionNumber':transactionNumber,
				  'transaction':'revalidate',
				  'transactionType':'retrieve'},
			  success: function(data){
				  data = $.parseJSON(data);
				  console.log(data);
				  $('#revalidation_player_id').val(data.agentId);
				  $('#revalidation_transaction_number').val(data.operationsTransactions.trasactionNumber);
				  $('#revalidation_after_transfer_cash').val(data.cashAmountAfter);
				  $('#revalidation_after_transfer_chips').val(data.chipsAmountAfter);
				  $('#revalidation_valid_bet_amount').val(data.validBet);
				  $('#revalidation_winloss_amount').val(data.winloss);
				  $('#revalidation_commission_amount').val(data.totalCommission);
				  $('#revalidation_operation_number').val(data.operationNo);
			  }
		});
	});
	
	
	$(document).on("click","#revalidation_submit_operations", function(){
		var revalidationPlayerId = $('#revalidation_player_id').val();
		var revalidationTransactionNumber = $('#revalidation_transaction_number').val();
		var revalidationAfterTransferCash = $('#revalidation_after_transfer_cash').val();
		var revalidationAfterTransferChips = $('#revalidation_after_transfer_chips').val();
		var revalidationValidBetAmount = $('#revalidation_valid_bet_amount').val();
		var revalidationWinlossAmount = $('#revalidation_winloss_amount').val();
		var revalidationCommissionAmount = $('#revalidation_commission_amount').val();
		var revalidationOperationNumber = $('#revalidation_operation_number').val();
		
		$.ajax({
			  type: "POST",
			  url: '../AgentSystem/AgentOperation',
			  data: {'revalidationPlayerId':revalidationPlayerId,
				  'revalidationTransactionNumber':revalidationTransactionNumber,
				  'revalidationAfterTransferCash':revalidationAfterTransferCash,
				  'revalidationAfterTransferChips':revalidationAfterTransferChips,
				  'revalidationValidBetAmount':revalidationValidBetAmount,
				  'revalidationWinlossAmount':revalidationWinlossAmount,
				  'revalidationCommissionAmount':revalidationCommissionAmount,
				  'revalidationOperationNumber':revalidationOperationNumber,
				  'transaction':'updateoperation'},
			  success: function(data){
				  
				  if(data == 'update_success'){
				  	  createTable();
					  $('#revalidation_modal').modal('toggle');
					  swal(SUCCESS,SUCCESSUPDATEENDOPERATION,'success');
				  }else if(data == 'invalid_operation_history'){
					  swal(ERROR,ERRORUPDATEENDPERATION,'error');
				  }else if(data == 'invalid_player'){
					  swal(ERROR,UPDATEENDOPERATIONINVALIDPLAYER,'error');
				  }else if(data == 'invalid_transfer_cash'){
					  swal(ERROR,ERRORUPDATEENDOPERATIONINVALIDTRANSFERCASH,'error');
				  }else if(data == 'invalid_transfer_chips'){
					  swal(ERROR,ERRORUPDATEENDOPERATIONINVALIDTRANSFERCHIPS,'error');
				  }else if(data == 'invalid_valid_bet_amount'){
					  swal(ERROR,ERRORUPDATEENDPERATIONINVALIDBETAMOUNT,'error');
				  }else if(data == 'invalid_winloss_amount'){
					  swal(ERROR,ERRORUPDATEENDPERATIONINVALIDWINLOSSAMOUNT,'error');
				  }else if(data == 'invalid_commission_amount'){
					  swal(ERROR,ERRORUPDATEENDPERATIONINVALIDCOMMISSIONAMOUNT,'error');
				  }else if(data == 'no_permission'){
					  $('#revalidation_modal').modal('toggle');
					  swal(ERROR,ERRORUPDATEENDPERATIONNOPERMISSION,'error');
				  }else{
					  $('#revalidation_modal').modal('toggle');
				  	swal(ERROR,INTERNALSERVERERROR,'error');
				  }
			  }
		});
	})
	
	
	//===============================================================================================================================================
	// get players balance and phone informations
	//===============================================================================================================================================
	
	$(document).on("change","#start_players_list1", function(){
		$('#start_currenct_balance').val($("#start_players_list1 :selected").data('balance'));
		var phone = $("#start_players_list1 :selected").data('phone');
		$('#start_player_mobile').val(phone == "undefined" ? '' : phone);
	})
	
	$(document).on("change","#operation_types", function(){
		var operationTypes = $("#operation_types :selected").val();
		
		if(operationTypes == 'Add'){
			$('#currenct_balance_div').css('display','');
			$('#amount_div').css('display','');
			$('#current_cash_amount_div').css('display','none');
			$('#current_chips_amount_div').css('display','none');
			$('#after_transfer_cash_div').css('display','none');
			$('#after_transfer_chips_div').css('display','none');
			$('#valid_bet_div').css('display','none');
			$('#winloss_amount_div').css('display','none');
			
			$('#table_number_div').css('display','none');
			$('#total_amount_div').css('display','none');
			
			$('#current_cash_amount').val('0');
			$('#current_chips_amount').val('0');
			$('#after_transfer_cash').val('0');
			$('#after_transfer_chips').val('0');
			$('#valid_bet_amount').val('0');
			$('#winloss_amount').val('0');
			$('#table_number').val('0');
			$('#total_amount').val('0');
		}else if(operationTypes == 'Transfer'){
			$('#currenct_balance_div').css('display','none');
			$('#amount_div').css('display','');
			$('#current_cash_amount_div').css('display','');
			$('#current_chips_amount_div').css('display','');
			$('#after_transfer_cash_div').css('display','');
			$('#after_transfer_chips_div').css('display','');
			$('#valid_bet_div').css('display','none');
			$('#winloss_amount_div').css('display','none');
			
			$('#table_number_div').css('display','none');
			$('#total_amount_div').css('display','none');
			
			$('#current_cash_amount').val('');
			$('#current_chips_amount').val('');
			$('#after_transfer_cash').val('');
			$('#after_transfer_chips').val('');
			$('#valid_bet_amount').val('0');
			$('#winloss_amount').val('0');
			$('#table_number').val('0');
			$('#total_amount').val('0');
			$('#additional_balance').val('0');
			 
		}else if(operationTypes == 'Record'){
			$('#currenct_balance_div').css('display','none');
			$('#amount_div').css('display','none');
			$('#current_cash_amount_div').css('display','');
			$('#current_chips_amount_div').css('display','');
			$('#after_transfer_cash_div').css('display','none');
			$('#after_transfer_chips_div').css('display','none');
			$('#valid_bet_div').css('display','none');
			$('#winloss_amount_div').css('display','none');
			
			$('#table_number_div').css('display','');
			$('#total_amount_div').css('display','');
			
			$('#current_cash_amount').val('');
			$('#current_chips_amount').val('');
			$('#after_transfer_cash').val('0');
			$('#after_transfer_chips').val('0');
			$('#valid_bet_amount').val('0');
			$('#winloss_amount').val('0');
			$('#table_number').val('');
			$('#total_amount').val('');
			console.log(operationTypes);
			$('#additional_balance').val('0');
		}else if(operationTypes == 'End'){
			$('#currenct_balance_div').css('display','none');
			$('#amount_div').css('display','none');
			$('#current_cash_amount_div').css('display','none');
			$('#current_chips_amount_div').css('display','none');
			$('#after_transfer_cash_div').css('display','');
			$('#after_transfer_chips_div').css('display','');
			$('#valid_bet_div').css('display','');
			$('#winloss_amount_div').css('display','');
			
			$('#table_number_div').css('display','none');
			$('#total_amount_div').css('display','none');
			
			$('#current_cash_amount').val('0');
			$('#current_chips_amount').val('0');
			$('#after_transfer_cash').val('');
			$('#after_transfer_chips').val('');
			$('#valid_bet_amount').val('');
			$('#winloss_amount').val('');
			$('#table_number').val('0');
			$('#total_amount').val('0');
			$('#additional_balance').val('0');
		}
		
		console.log(operationTypes);
		
	})
	
	function addThousandsSeparator(nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		console.log(x2.substr(0, 3));
		return x1 + x2.substr(0, 3);
	}
	
	function getFormattedDate(date) {
    	var now = new Date(date);
    	return now.format("yyyy-mm-dd HH:mm:ss");
    }
	
	$(document).on("click", ".operation_list_refresh", function(){
		createTable();
	});
	
	$(document).on("click", "#reset_btn", function(){
		$("#datetimepicker_start").val(returnCurrentDate()+' 00:00:00');
		$("#datetimepicker_end").val(returnCurrentDate() +' 23:59:59');
		$("#transasction_number_search").val('');
		$("#agent_id_search").val('');
	})
	
	$(document).on("click", "#submit_btn", function(){
		createTable();
		createAgentTable();
	})
	
});