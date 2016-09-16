$(document).ready(function(){
	
	$(".datetimepicker_start").val(returnCurrentDatePrevious());
	$(".datetimepicker_end").val(returnCurrentDate());
	 
	$('.datetimepicker_start, .datetimepicker_end').daterangepicker({
		timePicker: false, 
		timePicker24Hour: false,
		format: 'YYYY-MM-DD',
		singleDatePicker: true,
	    
	});
	
	function returnCurrentDate() {
		var fullDate = new Date();
		var twoDigitMonth = ((fullDate.getMonth().toString().length) == 1)? '0'+(fullDate.getMonth()+1) : (fullDate.getMonth()+1);
		var twoDigitDate = ((fullDate.getDate().toString().length) == 1)? '0'+(fullDate.getDate()) : (fullDate.getDate());
		var currentDate = fullDate.getFullYear()+'-' + twoDigitMonth + "-" +twoDigitDate; 
		return currentDate;
    }
	
	function returnCurrentDatePrevious() {
		var fullDate = new Date();
		var twoDigitMonth = ((fullDate.getMonth().toString().length) == 1)? '0'+(fullDate.getMonth()+1) : (fullDate.getMonth()+1);
		var twoDigitDate = ((fullDate.getDate().toString().length) == 1)? '0'+(fullDate.getDate()-6) : (fullDate.getDate()-6);
		var currentDate = fullDate.getFullYear()+'-' + twoDigitMonth + "-" +twoDigitDate; 
		return currentDate;
    }
	
	
	createTable()
	
	function createTable(){
		
		var startDate = $('#datetimepicker_start_withdraw').val();
		var endDate = $('#datetimepicker_end_withdraw').val();
		var agentId = $('#agentId :selected').val();
				
		var index = 1;
		$('#dailyWithdraw').DataTable({
			"ajax": "../AgentSystem/DashboardTableView?transaction=dailyWithdraw&startDate="+startDate+
					"&endDate="+endDate+"&agentId="+agentId,
			"columns": [
	            { "data": "agentId", render : function(data, type, full, meta){
	         		return index++;
	         	}},
	            { "data": "date" , render : function(data, type, full, meta){
	            	return data == undefined ? '' : getFormattedDate(data);
	            }},
	         	{ "data": "agentsWithdraw" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
	         	}},
	         	{ "data": "playersWithdraw" , render : function(data, type, full, meta){
	         		return addThousandsSeparator(data);
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
	
	$(document).on('click','#submitsearch_withdraw', function(){
		createTable()
	});
	
	
	
	
	
	//getAgentList();
	function getAgentList(){
		$.ajax({
			  type: "POST",
			  url: '../AgentSystem/DashboardTableView',
			  data: {'transaction':'getagentlist'},
			  success: function(data){
				  data = $.parseJSON(data);
				  $('.agent_withdraw').empty();
				  $.each(data.data, function( index, element ) {
					  $('.agent_withdraw').append('<option value="'+element.username+'">'+element.username+'</option>');
				  });
			  }
		});
	}
	
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
    	return now.format("yyyy-mm-dd");
    }
});