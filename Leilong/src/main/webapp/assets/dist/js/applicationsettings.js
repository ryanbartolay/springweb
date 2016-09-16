$(document).ready(function(){
	$(document).on("click", ".appsettingsupdates", function(){
		var type = $(this).data('type');
		var item = $('#'+$(this).data('type')+'_'+$(this).data('language')).val();
		var language = $(this).data('language');
		var itemid = $(this).data('itemid');
		
		if(type == 'commitnumber' || type == 'password'){
			$('#passwordvalidationmodal').modal({
				keyboard: false
			})
			
			$("#typedata").val(type);
			$("#itemdata").val(item);
			$("#itemiddata").val(itemid);
			$("#languagedata").val(language);
			
			
		}else{
			saveUpdates(type, item, itemid, language, '');
		}
		
		
	})
	
	$(document).on("click", "#savecommitbutton", function(){
		var typedata = $("#typedata").val();
		var itemdata = $("#itemdata").val();
		var itemiddata = $("#itemiddata").val();
		var languagedata = $("#languagedata").val();
		var password = $("#password").val();
		saveUpdates(typedata, itemdata, itemiddata, languagedata, password);
	});
	
	
	function saveUpdates(type, item, itemid, language, password){
		$.ajax({
	  		  type: "POST",
	  		  url: 'ApplicationSettings',
	  		  data: {'type':type, 
	  			  'item':item,
	  			  'language':language,
	  			  'itemid':itemid,
	  			  'password':password,
	  			  'transaction':'update'},
	  		  success: function(data){
	  			  
	  			$("#passwordvalidationmodalmessage").empty();
	  			$("#appmessage").empty();
	  			if(type == 'commitnumber' || type == 'password'){
	  				if(data == 'invalid_password'){
	  					
		  				 $("#passwordvalidationmodalmessage").append('<div class="alert alert-danger alert-dismissable">'+
	  	                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
	  	                    '<h4><i class="icon fa fa-ban"></i> Alert!</h4>'+
	  	                    invalidpassword+
	  	                   '</div>');
		  			 }else{
		  				 $("#passwordvalidationmodalmessage").append('<div class="alert alert-success alert-dismissable">'+
	  	                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
	  	                    '<h4><i class="icon fa fa-check"></i> Success!</h4>'+
	  	                    updatesuccess+
	  	                   '</div>');
		  			 }
	  			}else{
	  				if(data == 'update_success'){
	  					$("#appmessage").append('<div class="alert alert-success alert-dismissable">'+
	  	                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
	  	                    '<h4><i class="icon fa fa-check"></i> Success!</h4>'+
	  	                    updatesuccess+
	  	                   '</div>');
	  				}else if(data == 'update_success'){
	  					$("#appmessage").append('<div class="alert alert-success alert-dismissable">'+
	  	                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
	  	                    '<h4><i class="icon fa fa-check"></i> Success!</h4>'+
	  	                    updateunsuccess+
	  	                   '</div>');
	  				}else{
	  					$("#appmessage").append('<div class="alert alert-success alert-dismissable">'+
	  	                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
	  	                    '<h4><i class="icon fa fa-check"></i> Success!</h4>'+
	  	                    anerrorhasoccured+
	  	                   '</div>');
	  				}
	  			}
	  			 
	  		  }
		});
	}
})