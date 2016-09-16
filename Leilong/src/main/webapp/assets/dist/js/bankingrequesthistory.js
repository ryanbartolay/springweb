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
		var transactionType = $('#transasction_type_search :selected').val();
		var playerType = $('#player_type_search :selected').val();
				
		var index = 1;
		$('#bankingrequesthistory').DataTable({
			"ajax": "../BankingSystem/BankingHistory?transaction=bankinghistory&startDate="+startDate+
					"&endDate="+endDate+"&transactionNumber="+transactionNumber+"&playerIdSearch="+playerIdSearch+
					"&amountMinimum="+amountMinimum+"&amountMaximum="+amountMaximum+"&transactionType="+transactionType+
					"&playerType="+playerType,
			"columns": [
	            { "data": "agentId", render : function(data, type, full, meta){
	         		return index++;
	         	}},
	         	{ "data": "agentId" },
	         	{ "data": "agentType" , render : function(data, type, full, meta){
	         		if(data == 'players'){
	         			return PLAYERS;
	         		}
	         		return AGENTS;
	         	}},
	            { "data": "transactionNumber" },
	            { "data": "dateAdded" , render : function(data, type, full, meta){
	            	return data == undefined ? '' : getFormattedDate(data);
	            }},
	         	{ "data": "transactionType" , render : function(data, type, full, meta){
	         		if(data == 'Withdraw'){
	         			return WITHDRAW;
	         		}
	         		return DEPOSIT;
	         	}},
	         	{ "data": "amount" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},
	         	
	         	{ "data": "billNumber" , render : function(data, type, full, meta){
	         		return data == undefined ? '' : data;
	         	}},
	         	{ "data": "bankName" , render : function(data, type, full, meta){
	         		return data == undefined ? '' : data;
	         	}},
	         	{ "data": "accountNumber" , render : function(data, type, full, meta){
	         		return data == undefined ? '' : data;
	         	}},
	         	{ "data": "accountHolder" , render : function(data, type, full, meta){
	         		return data == undefined ? '' : data;
	         	}},
	         	{ "data": "currency.currency" , render : function(data, type, full, meta){
	         		return data == undefined ? '' : data;
	         	}},
	         	{ "data": "status.status" , render : function(data, type, full, meta){
	         		if(data == 'Validating'){
	         			return VALIDATING;
	         		}else if(data == 'Pending'){
	         			return PENDING;
	         		}else if(data == 'Validated'){
	         			return VALIDATED;
	         		}else if(data == 'Refused'){
	         			return REFUSED;
	         		} 
	         		return data == undefined ? '' : data;
	         	}},
	 
	         	{ "data": "dateProcessed" , render : function(data, type, full, meta){
	         		return data == undefined ? '' : getFormattedDate(data);
	         	}},
		     ],
	        "paging": true,
	        "lengthChange": true,
	        "searching": true,
	        "ordering": true,
	        "info": true,
	        "autoWidth": true,
	        "destroy":true,
	        "iDisplayLength": 50,
	        "lengthMenu": [[50, 200, 500, -1], [50, 200, 500, "All"]],
	        
	        "language": {
	            "url": url
	        }
	    });
	};
	
	$(document).on("click", '#submitsearch', function(){
		createTable();
	});
	
	$(document).on("click", '#bankhistory_button_reset', function(){
		
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
	
	$(document).on("click", "#bankhistory_button_reset", function(){
		$("#datetimepicker_start").val(returnCurrentDate()+' 00:00:00');
		$("#datetimepicker_end").val(returnCurrentDate() +' 23:59:59');
		$('#transasction_number_search').val('');
		$('#player_id_search').val('');
		$('#amount_minimum').val('');
		$('#amount_maximum').val('');
		$('#transasction_type_search').empty();
		$('#transasction_type_search').append(
				'<option value="">'+ALL+'</option>'+
				'<option value="Withdraw">'+WITHDRAW+'</option>'+
				'<option value="Deposit">'+DEPOSIT+'</option>');
		
		$('#player_type_search').empty();
		$('#player_type_search').append(
				'<option value="">'+ALL+'</option>'+
				'<option value="agents">'+AGENTTYPE+'</option>'+
				'<option value="players">'+PLAYERTYPE+'</option>');
		
	});
});