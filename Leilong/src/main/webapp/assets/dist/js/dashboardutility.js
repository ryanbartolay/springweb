$(function () {

	$.ajax({
		  type: "POST",
		  url: '../DashboardUtility',
		  data: {'transaction':'agentandplayerswithdraw'},
		  success: function(data){
			 	var data = $.parseJSON(data);
			 	$('#agent_daily_withdraw tbody').empty();
			 	$.each( data.agents, function( key, value ) {
		 		  console.log(value);
			 		$('#agent_daily_withdraw tbody').append(
		 				  '<tr>'+
		        			'<td>'+value.agentId+'</td>'+
		         			'<td><span class="label label-success">'+AGENT+'</span></td>'+
		          			'<td>'+value.currency.currency+' '+addThousandsSeparator(value.amount)+'</td>'+
		       	 		'</tr>'
		          	);
			 	});
			 	
		 		$('#players_daily_withdraw tbody').empty();
			 	$.each( data.players, function( key, value ) {
		 		  
		 		  $('#players_daily_withdraw tbody').append(
	 				  '<tr>'+
	        			'<td>'+value.agentId+'</td>'+
	         			'<td><span class="label label-danger">'+PLAYER+'</span></td>'+
	          			'<td>'+value.currency.currency+' '+addThousandsSeparator(value.amount)+'</td>'+
	       	 		'</tr>'
		 		  );
			 	});
			 	
			 	if(data.players.length == 0){
			 		$('#players_daily_withdraw tbody').append(NODATA);
			 	}
			 	if(data.agents.length == 0){
			 		$('#agent_daily_withdraw tbody').append(NODATA);
			 	}
		 	
		 }	
	})



    $.ajax({
  		  type: "POST",
  		  url: '../DashboardUtility',
  		  data: {'transaction':'newagentsandplayers'},
  		  success: function(data){
  			 	var data = $.parseJSON(data);

  			 	console.log(data);
  			 	var array = Array();
  			 	var index = 0;
  			 	$.each( data.months, function( key, value ) {
				  	var item = {}
			        item ["month"] = value;
			        item ["newAgents"] = data.newAgents[index];
			        item ["newPlayers"] = data.newPlayers[index];
			        array.push(item);
			        index++;
				});
  				CreateBar(array);
  		  }
	})
	    
	function CreateBar(array){
	   
	    var bar = new Morris.Bar({
	      element: 'bankingmonitor',
	      resize: true,
	      data: array,
	      barColors: ['#EC4949', '#438FB2'],
	      xkey: 'month',
	      ykeys: ['newAgents', 'newPlayers'],
	      labels: ['New Agents', 'New Players'],
	      hideHover: 'auto',
	      xLabelAngle: 90,
	    });
	}


	 // LINE CHART

	 $.ajax({
  		  type: "POST",
  		  url: '../DashboardUtility',
  		  data: {'transaction':'dailywithdraw'},
  		  success: function(data){
  			 	var data = $.parseJSON(data);
  			 	console.log(data.dailyDithdraw);
  				CreateLine(data.dailyDithdraw);
  		  }
	})
	 
	function CreateLine(array){
	    var line = new Morris.Line({
	      element: 'daily_withdraw',
	      resize: true,
	      data: array,
	      xkey: 'date',
	      ykeys: ['agentsWithdraw', 'playersWithdraw'],
	      labels: ['Total Agent Withdraw', 'Total Player Withdraw'],
	      lineColors: ['#EC4949', '#3c8dbc'],
	      hideHover: 'auto'
	    });
	}
	 
	 $.ajax({
 		  type: "POST",
 		  url: '../DashboardUtility',
 		  data: {'transaction':'allostartoperations'},
 		  success: function(data){
 			 	var data = $.parseJSON(data);
 			 	console.log(data.operationHistory);
 				CreateLineForLoginHistory(data.operationHistory)
 		  }
	})
	
	 function CreateLineForLoginHistory(array){
	    var line = new Morris.Line({
	      element: 'operation_request',
	      resize: true,
	      data: array,
	      xkey: 'date',
//	      ykeys: ['numberOfReuqestNotCancel', 'numberOfReuqestCancel'],
	      ykeys: ['numberOfReuqestNotCancel'],
	      labels: ['Start'],
	      lineColors: ['#3c8dbc'],
	      hideHover: 'auto'
	    });
	}
	 
	 
	 $(document).on('click', '#view_agent_withdraw', function(){
		 $('#agent_and_player_top_withdraw_modal').modal('toggle');
		 $('#moda_label').empty();
		 $('#moda_label').text(AGENTSDAILYTOPWITHDRAWLABEL);
		 $('#agent_and_player_top_withdraw_table tbody').empty();
		 
		 $.ajax({
	  		  type: "POST",
	  		  url: '../DashboardUtility',
	  		  data: {'transaction':'allagentwithdraw'},
	  		  success: function(data){
	  			 	var data = $.parseJSON(data);
	  			 	$.each( data.agents, function( key, value ) {
	  		 		  $('#agent_and_player_top_withdraw_table tbody').append(
	  	 				  '<tr>'+
	  	        			'<td>'+value.agentId+'</td>'+
	  	         			'<td><span class="label label-success">'+AGENT+'</span></td>'+
	  	          			'<td>'+value.currency.currency+' '+addThousandsSeparator(value.amount)+'</td>'+
	  	       	 		'</tr>'
	  		 		  );
	  			 	});
	  			 	
	  			 	if(data.agents.length == 0){
	  			 		$('#agent_and_player_top_withdraw_table tbody').append(NODATA);
	  			 	}
	  		  }
		})
		 
	 })
	 
	 $(document).on('click', '#view_players_withdraw', function(){
		 $('#agent_and_player_top_withdraw_modal').modal('toggle');
		 $('#moda_label').empty();
		 $('#moda_label').text(PLAYERSDAILYTOPWITHDRAWLABEL);
		 $('#agent_and_player_top_withdraw_table tbody').empty();
		 $.ajax({
	  		  type: "POST",
	  		  url: '../DashboardUtility',
	  		  data: {'transaction':'allplayerswithdraw'},
	  		  success: function(data){
	  			 	var data = $.parseJSON(data);
	  			 	$.each( data.players, function( key, value ) {
	  		 		  $('#agent_and_player_top_withdraw_table tbody').append(
	  	 				  '<tr>'+
	  	        			'<td>'+value.agentId+'</td>'+
	  	         			'<td><span class="label label-danger">'+PLAYER+'</span></td>'+
	  	          			'<td>'+value.currency.currency+' '+addThousandsSeparator(value.amount)+'</td>'+
	  	       	 		'</tr>'
	  		 		  );
	  			 	});
	  			 	
	  			 	if(data.players.length == 0){
	  			 		$('#agent_and_player_top_withdraw_table tbody').append(NODATA);
	  			 	}
	  		  }
		})
		 
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
	 
})


