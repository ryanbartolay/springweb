$(document).ready(function(){
	
	newstable();
	
	function newstable(){
		var index =1; 
		$('#newstable').DataTable({
			"processing": true,
	        "serverSide": true,
			"ajax": "../SystemSettings/News?transaction=newslist",
	    	"columns": [
		            { "data": "id", render : function(data, type, full, meta){
		         		return index++;
		         	}},
		         	{ "data": "news", render : function(data, type, full, meta){
		         		return data;
		         	}},
		         	{ "data": "status", render : function(data, type, full, meta){
		         		if(data){
		         			return '<i class="fa fa-circle text-green">'+ACTIVE+'</i>';
		         		}
		         		return '<i class="fa fa-circle text-red">'+DISABLED+'</i>'; ;
		         	}},
		         	{ "data": "dateAdded", render : function(data, type, full, meta){
		         		return getFormattedDate(data);
		         	}},
		         	{ "data": "dateModified", render : function(data, type, full, meta){
		         		return getFormattedDate(data);
		         	}},
		         	
		         	{ "data": "id", render : function(data, type, full, meta){
		         		return 	' <button class="btn btn-sm btn-default" data-id="'+full.id+'" data-id="'+full.id+'" data-news="'+full.news+'" data-status="'+full.status+'" id="update_news"><i class="fa fa-edit"></i></button> '+
		         				' <button class="btn btn-sm btn-danger" data-id="'+full.id+'" data-id="'+full.id+'" data-news="'+full.news+'" data-status="'+full.status+'" id="delete_news"><i class="fa fa-trash"></i></button>';
		         	}},
		         	],
			
	        "paging": true,
	        "lengthChange": true,
	        "searching": true,
	        "ordering": true,
	        "info": true,
	        "destroy":true,
	        "autoWidth": false,
	        
	        "language": {
	            "url": url
	        }
		});
	}
	
	$(document).on('click', '#update_news', function(){
		$('#new_update_news_modal').modal({
			keyboard: false,
			backdrop: 'static'
		})
		
		var status = $(this).data('status');
		var news = $(this).data('news');
		var id = $(this).data('id');
		
		$('#statusmodal').empty();
		if(status){
			$('#statusmodal').append('<input type="checkbox" checked="checked" id="statuschecked"> '+ACTIVE);
		}else{
			$('#statusmodal').append('<input type="checkbox" id="statuschecked"> '+DISABLED);
		}
		
		$('#newsId').val(id);
		$('#news_data').val(news);
		
		checkboxinit();
	});
	
	$(document).on('click', '#addnewsbtn', function(){
		$('#new_update_news_modal').modal({
			keyboard: false,
			backdrop: 'static'
		})
		
		$('#statusmodal').empty();
		$('#statusmodal').append('<input type="checkbox" checked="checked" id="statuschecked"> '+ACTIVE);
		
		$('#newsId').val(0);
		$('#news_data').val('');
		
		checkboxinit();
	});
	
	
	$(document).on('click', '#saveaddupdatebtnmodal', function(){
		var status = $('#' + 'statuschecked').is(":checked");
		var newsData = $("#news_data").val();
		var newsId = $("#newsId").val();
		
		$.ajax({
	  		  type: "POST",
	  		  url: 'News',
	  		  data: {	'status':status, 
	  			  		'newsData':newsData,
	  			  		'newsId':newsId,
	  			  		'transaction':'addupdate'
	  			  	},
	  		  success: function(data){
	  			  console.log(data);
	  			  newstable();
	  		  }
		});
		
	});
		
	$(document).on('click', '#delete_news', function(){
		var id = $(this).data('id');
		$.ajax({
	  		  type: "POST",
	  		  url: 'News',
	  		  data: {	'id':id, 
	  			  		'transaction':'delete'
	  			  	},
	  		  success: function(data){
	  			  console.log(data);
	  			  newstable();
	  		  }
		});
	});
	
	
	function checkboxinit(){
		$('input').iCheck({
          checkboxClass: 'icheckbox_square-blue',
          radioClass: 'iradio_square-blue',
          increaseArea: '20%' // optional
        });   
	}
	
	function getFormattedDate(date) {
    	var now = new Date(date);
    	return now.format("yyyy-mm-dd HH:mm:ss");
    }
	
});