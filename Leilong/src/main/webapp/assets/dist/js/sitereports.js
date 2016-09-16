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
		var playerType = $('#player_type_search :selected').val();
		var username = $('#username_search').val();
		var country = $('#country_search').val();
		var os = $('#os_search').val();
		var browsers = $('#browsers_search').val();
		
	
		var index = 1;
		$('#sitereportstable').DataTable({
			"ajax": "../Reports/SiteReports?transaction=sitejsonreports&startDate="+startDate+
					"&endDate="+endDate+"&username="+username+"&playerType="+playerType+"&country="+country+"&os="+os+
					"&browsers="+browsers,
			"columns": [
	            { "data": "agentId", render : function(data, type, full, meta){
	         		return index++;
	         	}},
	         	
	         	{ "data": "dateAdded" , render : function(data, type, full, meta){
	            	return data == undefined ? '' : getFormattedDate(data);
	            }},
	            
	         	{ "data": "ip" },
	         	
	         	{ "data": "users" , render : function(data, type, full, meta){
	         		return full.users == undefined ? full.agentPlayers == undefined ? '' : full.agentPlayers.username : full.users.username;
	         	}},
	         	{ "data": "geoipModel" , render : function(data, type, full, meta){
	         		return full.users == undefined ? full.agentPlayers == undefined ? '' : '<label class="label-danger">Player</label>' : '<label class="label-success">Agent</label>';
	         	}},
	         	{ "data": "operationSystem" , render : function(data, type, full, meta){
	         		return data == undefined ? '' : data;
	         	}},
	         	{ "data": "dateAdded" , render : function(data, type, full, meta){
	         		return full.geoipModel == undefined ? '' : data.name;
	         	}},
	         	{ "data": "browser" , render : function(data, type, full, meta){
	         		return (full.browser == undefined ? '':splitBrowsers(full.browser));
	         	}},
	         	
		     ],
	        "paging": true,
	        "lengthChange": true,
	        "searching": false,
	        "ordering": true,
	        "info": true,
	        "autoWidth": true,
	        "destroy":true,
	        "iDisplayLength": 25,
	        "lengthMenu": [[25, 100, 500, -1], [25, 100, 500, "All"]],
	        
	        "language": {
	            "url": url
	        }
	    });
		
		getSiteReportsForGraphs(startDate, endDate, playerType, username, country, os, browsers);
	};
	
	function getSiteReportsForGraphs(startDate, endDate, playerType, username, country, os, browsers){
		$.ajax({
			  type: "POST",
			  url: '../Reports/SiteReports',
			  data: {'transaction':'sitejsonreportsforgraphs',
				  	'startDate':startDate,
				  	'endDate':endDate,
				  	'username':username,
				  	'playerType':playerType,
				  	'country':country,
				  	'os':os,
				  	'browsers':browsers
				  },
			  success: function(data){
				  console.log(data);
				  var data = $.parseJSON(data);
				  
				  worldMap(data.map);
				  console.log(data.count);
				  var colors = ['#f56954','#00a65a','#f39c12','#00c0ef','#3c8dbc','#d2d6de','',''];
				  var highlight = ['#f56954','#00a65a','#f39c12','#00c0ef','#3c8dbc','#d2d6de','',''];
				  var index = 0;
				  var countData = Array();
				  $('.country-name').empty();
				  $.each( data.count, function( index, value ){
					  
					  $('.country-name').append('<li><i class="fa fa-circle-o " style="color:'+colors[index]+'"></i> '+value.name+'</li>');
					  
					  var myObject = new Object();
					  myObject.label = value.name;
					  myObject.value = value.count;
					  myObject.color = colors[index];
					  myObject.highlight = highlight[index];
					  
					  index++;
					  countData.push(myObject);
				  });
				  
				  createPIEGRAPH(countData);
				  
			  }
		})
	}
	
	
	
	function worldMap(data){
		$('#world-map-markers').empty();
		
		  $('#world-map-markers').vectorMap({
		    map: 'world_mill_en',
		    normalizeFunction: 'polynomial',
		    hoverOpacity: 0.7,
		    hoverColor: false,
		    backgroundColor: 'transparent',
		    regionStyle: {
		      initial: {
		        fill: 'rgba(171, 147, 85, 1)',
		        "fill-opacity": 1,
		        stroke: 'none',
		        "stroke-width": 0,
		        "stroke-opacity": 1
		      },
		      hover: {
		        "fill-opacity": 0.7,
		        cursor: 'pointer'
		      },
		      selected: {
		        fill: 'yellow'
		      },
		      selectedHover: {
		      }
		    },
		    markerStyle: {
		      initial: {
		        fill: '#00a65a',
		        stroke: '#111'
		      }
		    },
		    markers: data
		  });
		}
	
	
	function createPIEGRAPH(PieData){
		  $('#pieChart').empty();

		  //-------------
		  //- PIE CHART -
		  //-------------
		  // Get context with jQuery - using jQuery's .get() method.
		  var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
		  var pieChart = new Chart(pieChartCanvas);
		  
		  var pieOptions = {
		    //Boolean - Whether we should show a stroke on each segment
		    segmentShowStroke: true,
		    //String - The colour of each segment stroke
		    segmentStrokeColor: "#fff",
		    //Number - The width of each segment stroke
		    segmentStrokeWidth: 1,
		    //Number - The percentage of the chart that we cut out of the middle
		    percentageInnerCutout: 50, // This is 0 for Pie charts
		    //Number - Amount of animation steps
		    animationSteps: 100,
		    //String - Animation easing effect
		    animationEasing: "easeOutBounce",
		    //Boolean - Whether we animate the rotation of the Doughnut
		    animateRotate: true,
		    //Boolean - Whether we animate scaling the Doughnut from the centre
		    animateScale: false,
		    //Boolean - whether to make the chart responsive to window resizing
		    responsive: true,
		    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
		    maintainAspectRatio: false,
		    //String - A legend template
		    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
		    //String - A tooltip template
		    tooltipTemplate: "<%=value %> <%=label%>"
		  };
		  //Create pie or douhnut chart
		  // You can switch between pie and douhnut using the method below.
		  pieChart.Doughnut(PieData, pieOptions);
		  //-----------------
		  //- END PIE CHART -
		  //-----------------
	}
	
	
	
	$(document).on('click', '#submitsearch', function(){
		createTable();
	})
	
	$(document).on('click', '#site_reports_button_reset', function(){
		$("#datetimepicker_start").val(returnCurrentDate()+' 00:00:00');
		$("#datetimepicker_end").val(returnCurrentDate() +' 23:59:59');
		$('#player_type_search :selected').val('All');
		$('#username_search').val('');
		$('#country_search').val('');
		$('#os_search').val('');
		$('#browsers_search').val('');
	})
	
	function splitBrowsers(str){
		var res = str.split(";");
		var strArray = '';
		$.each(res, function( index, element ) {
			strArray = strArray+element+'<br>';
		})
		
		return strArray;
	}
	
	function getFormattedDate(date) {
    	var now = new Date(date);
    	return now.format("yyyy-mm-dd HH:mm:ss");
    }
	
});