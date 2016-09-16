$(document).ready(function(){
	$('#currencytable').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        
        "language": {
            "url": url
        }
      });
	
	//====================================================================================================================
	// update currency modal open
	//====================================================================================================================
	
	$(document).on("click", "#currencyeditbtn", function(){
		$('#message').empty();
		var currencyid = $(this).data("currencyid"),
		currency 	= $(this).data("currency"),
		exchange 	= $(this).data("exchange"),
		status 		= $(this).data("status");
		$('#currencymodal').modal({
			keyboard: false
		})
		$('#currencyid').val(currencyid);
		$('#currency').val(currency);
		$('#exchange').val(exchange);
		$('#statusmodal').empty();
		if(status){
			$('#statusmodal').append('<input type="checkbox" checked="checked" id="statuschecked"> '+activelabel);
		}else{
			$('#statusmodal').append('<input type="checkbox" id="statuschecked"> '+activelabel);
		}
		$('#transaction').val('edit');
		$('#currencymodaltitle').empty();
		$('#currencymodaltitle').append(modalupdatetitle);
		$('#currency').attr('disabled','disabled');
		checkboxinit();
	})
	
	//====================================================================================================================
	// add new currency modal open
	//====================================================================================================================
	
	$(document).on("click", "#addcurrencybtn", function(){
		$('#message').empty();
		$('#currencymodal').modal({
			keyboard: false
		})
		$('#currency').removeAttr('disabled');
		$("#currency").val(''),
		$("#exchange").val(''),
		$("#currencyid").val(0);
		$("#transaction").val('add');
		$('#statusmodal').empty();
		$('#statusmodal').append('<input type="checkbox" checked="checked" id="statuschecked"> '+activelabel);
		$('#currencymodaltitle').empty();
		$('#currencymodaltitle').append(modaladdtitle);
		checkboxinit();
	});
	
	//====================================================================================================================
	// add new currency and update base on transaction submit form
	//====================================================================================================================
	
	$(document).on("click", "#saveaddupdatebtnmodal", function(){
		var currency = $("#currency").val(),
		exchange = $("#exchange").val(),
		currencyid = $("#currencyid").val(),
		transaction = $("#transaction").val(),
		status = $('#' + 'statuschecked').is(":checked");
		
		$.ajax({
  		  type: "POST",
  		  url: 'Currency',
  		  data: {'currencyid':currencyid, 
  			  'currency':currency,
  			  'exchange':exchange,
  			  'status':status,
  			  'transaction':transaction},
  		  success: function(data){
  			  $('#message').empty();
  			  $('#currencymodal').modal('toggle');
  			  if(data == 'add_success'){
  			  	swal(SUCCESS, ADDSUCCESS, "success");
  			  }else if(data == 'add_unsuccess'){
  			  	swal(SUCCESS, ADDSUCCESS, "success");
  			  }else if(data == 'update_success'){
  			  	swal(SUCCESS, UPDATESUCCESS, "success");
  			  }else if(data == 'update_unsuccess'){
  			  	swal(ERROR, UPDATEUNSUCCESS, "error");
  			  }else if(data == 'error'){
  			  	swal(ERROR, ANERRORHASOCCURED, "error");
  			  }
  	      }
  		});
	});
	
	//====================================================================================================================
	// add new currency and update base on transaction submit form
	//====================================================================================================================
	
	$(document).on("click", "#currencydeletebtn", function(){
		var currencyid = $(this).data("currencyid");
		console.log(currencyid)
		$.ajax({
  		  	type: "POST",
  		  	url: 'Currency',
  		  	data: {'currencyid':currencyid, 
	  			  'transaction':'delete'},
  			success: function(data){
  				$('#currencymessage').empty();
  				if(data == 'delete_success'){
  					$('#currencymessage').append('<div class="alert alert-danger alert-dismissable">'+
	                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
	                    CURRENCYDELETESUCCESSFULL+'.'+
	                '</div>');
  				}else if(data == 'delete_unsuccess'){
  					$('#currencymessage').append('<div class="alert alert-danger alert-dismissable">'+
	                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
	                    CURRENCYDELETEUNSUCCESSFULL+'.'+
	                '</div>');
  				}else{
  					$('#currencymessage').append('<div class="alert alert-danger alert-dismissable">'+
	                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
	                    ERROR+'.'+
	                '</div>');
  				}
  				
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
	
})