$(document).on("click", ".agenttreeview", function() {
	$('#agent_tree_view').modal({
		keyboard: false,
		backdrop: 'static'
	})
	
	var username = $(this).data('username');
	var balance = $(this).data('balance');
	var currency = $(this).data('currency');
	
	
	console.log(username);
	
	$('#agent_tree_view_data').empty();
	
	$('#main_agent_username').html(username+' ( '+currency+' '+addThousandsSeparator(balance)+' ) ');	
	
	$.ajax({
	  type: "POST",
	  url: '../AgentSystem/AgentTree',
	  data: {'username':username},
	  success: function(data){
		data = $.parseJSON(data);
		
		console.log(data);
		
		if(data.length == 0){
			$('#agent_tree_view_data').append('');
		}else{
  			createTreeView(data);
		}
		
	  }
	})
});



function createTreeView(data){	
	$('#agent_tree_view_data').append(
		'<ul class="wtree ">'
	);
	
	$.each(data, function( index, element ) {
		console.log(element);
		$('.wtree').append('<li cl><span><i class="fa fa-plus username" data-name="'+element.username+'" style="cursor:pointer;"></i> '+element.username+ ' (' +element.currency.currency +' '+addThousandsSeparator(element.balance)+ ' ) </span></li><ul id="'+element.username+'"></ul>');
	});
	$('#agent_tree_view_data').append('</ul>');
}


$(document).on('click', '.username', function(){
	var username = $(this).data('name');
	
	if($(this).hasClass('active')){
		$(this).removeClass('active');
		$(this).removeClass('fa-minus');
		$(this).addClass('fa-plus');
		$('#'+username).empty();
		
		
	}else{
		$(this).removeClass('fa-plus');
		$(this).addClass('fa-minus');
		$(this).addClass('active');
		getSubAgents(username);
	}	
})

function getSubAgents(username){
	$.ajax({
	  type: "POST",
	  url: '../AgentSystem/AgentTree',
	  data: {'username':username},
	  success: function(data){
		data = $.parseJSON(data);
		console.log(data);
		$.each(data, function( index, element ) {
			console.log(element);
			$('#'+username).append('<li cl><span><i class="fa fa-plus username" data-name="'+element.username+'" style="cursor:pointer;"></i> '+
					element.username+ ' (' +element.currency.currency +' '+addThousandsSeparator(element.balance)+
					' )</span></li><ul id="'+element.username+'"></ul>');
			});
	  	}
	})
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

$(document).ready(function(){
	$(this).click('ul.wtree li > span',function(e){
		if($(e.target).parent().hasClass('active') ) {
			$(e.target).parent().removeClass('active');
		} else if($(e.target).hasClass('username') ) {
    		$(e.target).parent().addClass('active');
		} else {
			console.log($(e.target));

		}
	});
});