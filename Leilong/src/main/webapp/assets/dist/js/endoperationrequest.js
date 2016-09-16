$(document).ready(function(){
	$(document).on('click', '#end_operation_number_li', function(){
		$('#end_request_details').modal({
			keyboard: false,
			backdrop: 'static'
		})
		
		$('#end_request_detail_table tbody').empty();
		
		$.ajax({
  		  	type: "POST",
  		  	url: '../PlayerEndOperationRequest',
  		  	data: {'transaction':'currencyasjson'},
  		  	success: function(data){
  		  		var data = $.parseJSON(data);
  		  		console.log(data.data);
  		  		var id = 1;
  		  		$.each(data.data, function( index, element ) {
  		  			console.log(element.operationsTransactions);
 					 $('#end_request_detail_table tbody').append(
 							 '<tr>'+
 							 	'<td>'+id+++'</td>'+
 							 	'<td>'+element.agentPlayers.username+'</td>'+
 							 	'<td>'+element.operationsTransactions.trasactionNumber+'</td>'+
 							 	'<td>'+getFormattedDate(element.dateRequested)+'</td>'+
 							 '</tr>');
  		  		})
  		  		
  		  	}
		});
		
	});
	
	function getFormattedDate(date) {
    	var now = new Date(date);
    	return now.format("yyyy-mm-dd HH:mm:ss");
    }
});