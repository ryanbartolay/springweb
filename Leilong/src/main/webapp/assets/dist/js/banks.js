$(document).ready(function(){
	$('#bankstable').DataTable({
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
	
	$(document).on("click", "#addbanksbtn", function(){
		$('#message').empty();
		$('#banksmodal').modal({
			backdrop: 'static',
			keyboard: false
		})
		$("#banksname").val(''),
		$("#transaction").val('add'),
		$("#bankid").val(0);
		$("#bankaccount").val('');
		$("#cardholder").val('');
		$("#minimumamount").val('');
		$("#maximumamount").val('');
		$('#statusmodal').empty();
		$('#statusmodal').append('<input type="checkbox" checked="checked" id="statuschecked"> '+statuslabel);
		$('#banksmodaltitle').empty();
		$('#banksmodaltitle').append(modaladdtitle);
		checkboxinit();
	});
	
	$(document).on("click", "#editbankbtn", function(){
		var bankname = $(this).data('bankname');
		var bankaccount = $(this).data('bankaccount');
		var accountholder = $(this).data('accountholder');
		var bankid = $(this).data('bankid');
		var bankstatus = $(this).data('bankstatus');
		var bankbranch = $(this).data('bankbranch');
		var minimumAmount = $(this).data('minimum-amount');
		var maximumAmount = $(this).data('maximum-amount');
		
		$('#message').empty();
		$('#banksmodal').modal({
			backdrop: 'static',
			keyboard: false
		})
		$("#banksname").val(bankname),
		$("#transaction").val('edit'),
		$("#bankid").val(bankid);
		$("#bankaccount").val(bankaccount);
		$("#cardholder").val(accountholder);
		$("#bankbranch").val(bankbranch);
		$("#minimumamount").val(minimumAmount);
		$("#maximumamount").val(maximumAmount);
		$('#statusmodal').empty();
		if(bankstatus){
			$('#statusmodal').append('<input type="checkbox" checked="checked" id="statuschecked"> '+statuslabel);
		}else{
			$('#statusmodal').append('<input type="checkbox" id="statuschecked"> '+statuslabel);
		}
		$('#banksmodaltitle').empty();
		$('#banksmodaltitle').append(modalupdatetitle);
		checkboxinit();
	});
	
	
	
	$(document).on("click", "#saveaddupdatebtnmodal", function(){
		var banksname = $("#banksname").val(),
		bankid 		= $("#bankid").val(),
		cardholder 	= $("#cardholder").val(),
		bankaccount = $("#bankaccount").val(),
		bankbranch	= $("#bankbranch").val(),
		transaction = $("#transaction").val(),
		minimumamount = $("#minimumamount").val(),
		maximumamount = $("#maximumamount").val();
		status 		= $('#' + 'statuschecked').is(":checked");
		
		if(banksname == ''){
			swal("Error!", "Bank name is required.", "error");
			return;
		}
		if(cardholder == ''){
			swal("Error!", "Cardholder is required.", "error");
			return;
		}
		if(bankaccount == ''){
			swal("Error!", "Bank account is required.", "error");
			return;
		}
		if(bankbranch == ''){
			swal("Error!", "Bank branch is required.", "error");
			return;
		}
		if(minimumamount == ''){
			swal("Error!", "Minimum Amount is required.", "error");
			return;
		}
		if(maximumamount == ''){
			swal("Error!", "Maximum Amount is required.", "error");
			return;
		}
		$.ajax({
  		  type: "POST",
  		  url: 'Banks',
  		  data: {'banksname':banksname, 
  			  'bankid':bankid,
  			  'cardholder':cardholder,
  			  'bankaccount':bankaccount,
  			  'bankbranch':bankbranch,
  			  'status':status,
  			  'transaction':transaction,
  			  'minimumamount':minimumamount,
  			  'maximumamount':maximumamount},
  		  success: function(data){
  			  console.log(data);
  			  if(data =='add_success'){
  				swalMessage("Success", "Bank "+banksname+" successfully added.", "success"); 
  				$('#banksmodal').modal('toggle');
  				location.reload(true);
  			  }else if(data =='add_unsuccess'){
  				swalMessage("Error", "Bank "+banksname+" unsuccessfully added.", "error"); 
  			  }else if(data =='no_permission'){
  				swalMessage("Error", "You don't have permission to add/update banks.", "error"); 
  			  }else if(data =='update_success'){
  				$('#banksmodal').modal('toggle');
  				swalMessage("Success", "Bank "+banksname+" successfully updated.", "success");
  				location.reload(true);
  			  }else if(data =='update_unsuccess'){
  				swalMessage("Error", "Bank "+banksname+" unsuccessfully updated.", "error"); 
  			  }else if(data =='invalid_transactions'){
  				swalMessage("Error", "Invalid bank transaction.", "error"); 
  			  }else if(data =='amount_minimum_must_be_lower_than_maximum'){
  				swalMessage("Error", "Deposit Minimum Amount must be lesser than Deposit Maximum Amount", "error");
  			  }
  		  }
		});
	});
	
	function swalMessage(title, text, type){
		swal({
			  title: title,
			  text: text,
			  type: type,
			  showCancelButton: true,
			  confirmButtonClass: "btn-warning",
			  confirmButtonText: "Closed",
			  closeOnConfirm: false
			},
			function(){
				location.reload(true);
			});
		
	}
	
	$(document).on("click", "#deletebankbtn", function(){
		var bankname = $(this).data('bankname');
		var bankaccount = $(this).data('bankaccount');
		var accountholder = $(this).data('accountholder');
		var bankid = $(this).data('bankid');
		var bankstatus = $(this).data('bankstatus');
		
		$("#banksnamedelete").val(bankname),
		$("#bankaccountdelete").val(bankaccount),
		$("#bankiddelete").val(bankid),
		$("#cardholderdelete").val(accountholder),
		
		$('#deletebanksmodal').modal({
			keyboard: false
		})
		$('#deletebanksmodaltitle').empty();
		$('#deletebanksmodaltitle').append(modaldeletetitle);
		$('#deletemessage').empty();
		$('#deletemessage').append('<div class="alert alert-warning alert-dismissable">'+
				'<h4>	<i class="icon fa fa-check"></i> Warning!</h4>'+
				deletemessage+'.'+
			'</div>');
	});
	
	$(document).on("click", "#deleteconfirm", function(){
		var banksname = $("#banksnamedelete").val(),
		bankid 		= $("#bankiddelete").val(),
		cardholder 	= $("#cardholderdelete").val(),
		bankaccount = $("#bankaccountdelete").val(),
		transaction = $("#transactiondelete").val();
		
		$.ajax({
  		  type: "POST",
  		  url: 'Banks',
  		  data: {'banksname':banksname, 
  			  'bankid':bankid,
  			  'cardholder':cardholder,
  			  'bankaccount':bankaccount,
  			  'status':'true',
  			  'transaction':transaction},
  		  success: function(data){
  			  location.reload(true);
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
	
	/*Input Number Only*/
    $('#bankaccount, #minimumamount, #maximumamount').keypress(function(key) {
    	// Allow only backspace and delete
    	if(key.charCode < 48 || key.charCode > 57) return false;
    });
});