$(document).ready(function(){
	
	$(document).on("click","#agent_profile_setup_btn",function(){
		var accountId = $('#profile_account_id').val();
		var smsNumber = $('#profile_sms_number').val();
		var authorizedNumber = $('#profile_authorized_number').val();
		var phoneNumber = $('#profile_phone_number').val();
		var email = $('#profile_email').val();
		var pin = $('#profile_pin').val();
		var newPassword = $('#profile_new_password').val();
		var confirmPassword = $('#profile_confirm_password').val();

		
		$.ajax({
	  		  type: "POST",
	  		  url: 'ChangePassword',
	  		  data: {'accountId':accountId, 
	  			  'smsNumber':smsNumber,
	  			  'authorizedNumber':authorizedNumber,
	  			  'phoneNumber':phoneNumber,
	  			  'email':email,
	  			  'pin':pin,
	  			  'newPassword':newPassword,
	  			  'confirmPassword':confirmPassword,
	  			  'transaction':'profilesetup'},
	  		  success: function(data){
	  			  console.log(data);
	  			  if(data == 'success'){
	  				swal({
	  				  title: UPDATESUCCESS,
	  				  text: YOURPROFILEUPDATED,
	  				  type: 'success',
	  				  showCancelButton: false,
	  				  confirmButtonColor: '#3085d6',
	  				  cancelButtonColor: '#d33',
	  				  confirmButtonText: LOGIN
	  				}).then(function(isConfirm) {
	  					loginAgent(newPassword);
	  				}).catch(function(error){
	  					console.log(error);
	  				})
	  			  }else  if(data == 'empty_account_id'){
	  				swal(ERROR, ACCOUNTIDISREQUIRED, "error"); 
	  			  }else  if(data == 'empty_sms_number'){
	  				swal(ERROR, SMSNUMBERISREQUIRED, "error"); 
	  			  }else  if(data == 'empty_authorized_number'){
	  				swal(ERROR, AUTHORIZEDNUMBERISREQUIRED, "error"); 
	  			  }else  if(data == 'empty_email'){
	  				swal(ERROR, EMAILISREQUIRED, "error"); 
	  			  }else  if(data == 'empty_pin'){
	  				swal(ERROR, PINISREQUIRED, "error"); 
	  			  }else  if(data == 'empty_new_password'){
	  				swal(ERROR, NEWPASSWORDREQUIRED, "error"); 
	  			  }else  if(data == 'empty_confirm_password'){
	  				swal(ERROR, CONFRIMPASSWORDREQUIRED, "error"); 
	  			  }else  if(data == 'password_not_match'){
	  				swal(ERROR, PASSWORDNOTMATCH, "error"); 
	  			  }else  if(data == 'pin_length_invalid'){
	  				swal(ERROR, INVALIDPINENTER, "error");
	  			  }else  if(data == 'error'){
	  				swal(SUCCESS, PROFILEUPDATESSUCCESS, "success"); 
	  			  }else  if(data == 'invalid_email'){
	  				swal(ERROR, INVALIDEMAIL, "error"); 
	  			  }else  if(data == 'password_length_invalid'){
	  				swal(SUCCESS, PASSWORDLENGTHERROR, "error"); 
	  			  }else if(data == 'authorize_no_exist'){
	  				swal(ERROR, AUTHORIZEDNUMBERALREADYEXIST, "error"); 
	  			  }else{
	  				swal(ERROR, INTERNALSERVERERROR, "error"); 
	  			  }
	  		  }
	  			  
	  			
	  			  
		});
		
	});
	
	function loginAgent(password){
		$.ajax({
	  		  type: "POST",
	  		  url: 'Login',
	  		  data: {'username':tmpUsername, 
	  			  'password':password
	  		  },
	  		  success: function(data){
	  			window.location.href = 'AgentSystem/AgentDashboard';
	  		  }

		});
	}
	
});