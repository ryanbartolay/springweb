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
	
	function createTable(){
		
		var startDate = $('#datetimepicker_start').val();
		var endDate = $('#datetimepicker_end').val();
		var transactionNumber = $('#transasction_number_search').val();
		var playerIdSearch = $('#player_id_search').val();
		var amountMinimum = $('#amount_minimum').val();
		var amountMaximum = $('#amount_maximum').val();
		
		
		var index = 1;
		$('#transaction_history').DataTable({
			"ajax": "../AgentSystem/TransactionHistory?transaction=transactionhistory&startDate="+startDate+
					"&endDate="+endDate+"&transactionNumber="+transactionNumber+"&playerIdSearch="+playerIdSearch+
					"&amountMinimum="+amountMinimum+"&amountMaximum="+amountMaximum,
			"columns": [
	            { "data": "username", render : function(data, type, full, meta){
	         		return index++;
	         	}},
	         	{ "data": "agentId" },
	         	{ "data": "agentType" , render : function(data, type, full, meta){
	         		return data == 'agents' ? '<span class="label label-success">'+AGENT+'</span>' : '<span class="label label-warning">'+PLAYER+'</span>';
	         	}},
	            { "data": "transactionNumber" },
	            { "data": "date" , render : function(data, type, full, meta){
	         		return getFormattedDate(data);
	         	}},
	         	{ "data": "amount" , render : function(data, type, full, meta){
	         		return addThousandsSeparator((full.amount == undefined) ? 0 : full.amount);
	         	}},
	         	{ "data": "availableBalanceBefore" , render : function(data, type, full, meta){
	         		return '<span class="text-green">Available : </span>'+addThousandsSeparator(full.availableBalanceBefore)+'<br>'+
	         				'<span class="text-red">Frozen : </span>'+addThousandsSeparator(full.frozenBalanceBefore)+'<br>'+
	         				'<span class="">Pending : </span>'+addThousandsSeparator(full.pendingBalanceBefore)+'<br>';
	         	}},
	         	{ "data": "availableBalanceBefore" , render : function(data, type, full, meta){
	         		return '<span class="text-green">Available : </span>'+addThousandsSeparator(full.availableBalanceAfter)+'<br>'+
	         				'<span class="text-red">Frozen : </span>'+addThousandsSeparator(full.frozenBalanceAfter)+'<br>'+
	         				'<span class="">Pending : </span>'+addThousandsSeparator(full.pendingBalanceAfter)+'<br>';
	         	}},
	         	
	         	{ "data": "currency" , render : function(data, type, full, meta){
	         		return full.currency == undefined ? '' : full.currency;
	         	}},
	         	{ "data": "operator" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},
	         	{ "data": "transactionType" , render : function(data, type, full, meta){
	         		if(data == 'Start'){
	         			return START;
	         		}else if(data == 'Start Operation'){
	         			return STARTOPERATION;
	         		}else if(data == 'Withdraw'){
	         			return WITHDRAW;
	         		}else if(data == 'Winning'){
	         			return WINNING;
	         		}else if(data == 'Start Operation'){
	         			return STARTOPERATION;
	         		}else if(data == 'End Operation'){
	         			return ENDOPERATION;
	         		}else if(data == 'Refund'){
	         			return REFUND;
	         		}else if(data == 'Start Operation'){
	         			return STARTOPERATION;
	         		}else if(data == 'Add Operation'){
	         			return ADDOPERATION;
	         		}else if(data =='Deposit'){
	         			return DEPOSIT;
	         		}else if(data =='Transfer'){
	         			return TRASNFER;
	         		}
	         		return data;
	         	}}
		     ],
	        "paging": true,
	        "lengthChange": true,
	        "searching": false,
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
	
	
	$(document).on("click","#search_submit", function(){
		createTable();
	});
	
	$(document).on("click",".view-operations-modal", function(){
		//======================================================================================================================================================
		// open modal
		//======================================================================================================================================================
		$('#operation_detailed_modal').modal({
			keyboard: false,
			backdrop: 'static',
		})
		
		var transactionnumber = $(this).data('transaction-number');
		
		//======================================================================================================================================================
		// get operations data and initialize datatables
		//======================================================================================================================================================
		
//		initializeDatatables()
		
		$.ajax({
		  type: "POST",
		  url: '../AgentSystem/AgentOperation',
		  data: {'transaction':'detailed_operations',
			  'transactionnumber':transactionnumber},
		  success: function(data){
			  var data = $.parseJSON(data);
			  $('#operations_history_detailed tbody').empty();
			  $.each(data, function( index, element ) {
				  console.log(element)
				  $('#operations_history_detailed tbody').append('<tr id="operation_'+element.operationNo+'">'+
				  	'<td>'+element.agentId+'</td>'+
				  	'<td>'+element.operationNo+'</td>'+
				  	'<td>'+element.operationTypes+'</td>'+
				  	'<td>'+element.amount+'</td>'+
				  	'<td>'+element.status+'</td>'+
				  	'<td><a class="btn btn-success btn-sm '+(element.status == 'Validated'? '':'operation-approved')+'" data-toggle="tooltip" data-placement="left" title="" '+(element.status == 'Validating'? '':'disabled')+' data-original-title="Approve" data-operation-number="'+element.operationNo+'" data-player-id="'+element.agentId+'"><i class="fa fa-thumbs-up"></i></a> '+
				  	'<a class="btn btn-danger btn-sm '+(element.status == 'Validated'? '':'operation-refused')+'" data-toggle="tooltip" data-placement="left" title="" '+(element.status == 'Validating'? '':'disabled')+' data-original-title="Refuse" data-operation-number="'+element.operationNo+'" data-player-id="'+element.agentId+'"><i class="fa fa-thumbs-down"></i></a></td>'+
				  	'</tr>');
				  
			  })
			  
		  	}
		});	
	})
	
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
	        "destroy":true,
	        
	        "language": {
	            "url": url
	        }
		});
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
	
	$(document).on("click", "#export_to_csv", function(){
		var startDate = $('#datetimepicker_start').val();
		var endDate = $('#datetimepicker_end').val();
		var transactionNumber = $('#transasction_number_search').val();
		var playerIdSearch = $('#player_id_search').val();
		var amountMinimum = $('#amount_minimum').val();
		var amountMaximum = $('#amount_maximum').val();
		
		window.location ="../AgentSystem/TransactionHistory?transaction=tocsv&startDate="+startDate+
					"&endDate="+endDate+"&transactionNumber="+transactionNumber+"&playerIdSearch="+playerIdSearch+
					"&amountMinimum="+amountMinimum+"&amountMaximum="+amountMaximum;
		
	})
	
	$(document).on("click", "#transaction_history_reset", function(){
		$('#datetimepicker_start').val(returnCurrentDate()+' 00:00:00');
		$('#datetimepicker_end').val(returnCurrentDate() +' 23:59:59');
		$('#transasction_number_search').val('');
		$('#player_id_search').val('');
		$('#amount_minimum').val('');
		$('#amount_maximum').val('');
	})
	
	function getFormattedDate(date) {
    	var now = new Date(date);
    	return now.format("yyyy-mm-dd HH:mm:ss");
    }
});