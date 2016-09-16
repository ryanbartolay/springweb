$(document).ready(function(){
	
	$(document).on('click','#back_user_profile', function(){
  		$('#back_user_profile_modal').modal('toggle');
	});
	
	
	$(document).on('click','#users_profile_update_btn', function(){
  		openPasswordModal();
  		$('#back_user_profile_modal').modal('toggle');
	});
	
	function openPasswordModal(){
		swal({
		  	title: ENTERPASSWORD,
		  	input: 'password',
		  	showCancelButton: true,
		  	allowOutsideClick:false,
		  	inputAttributes: {
		    	'maxlength': 10,
		    	'autocapitalize': 'off',
		    	'autocorrect': 'off'
		  	},
		  	inputValidator: function(value) {
			    return new Promise(function(resolve, reject) {
			      if (value !== '') {
			    	  validationUsersCurrenctPassword(value, function(requestResult) {
				      		if(requestResult == 'valid'){
								resolve(requestResult);
				      		}else{
				      			reject(INVALIDPASSWORD);
				      		}
			      		});
			      	} else {
			        	reject(PASSWORDISEMPTY);
			      	}
			    });
			}

		}).then(function(result) {
			if(result){
				updateUsersProfiles();
			}
			
		})
	}
	
	function validationUsersCurrenctPassword(password, cb){
		$.ajax({
		  	type: "POST",
		  	url: "../AgentInformations",
		  	data: {'transaction':'passwordvalidation',
		  		'password':password
		  	},success: function(data){
		   		cb(data);
		  	}
		});
	}
	
	function updateUsersProfiles(){
		
		var firstName = $('#users_profile_first_name').val();
  		var laststName = $('#users_profile_last_name').val();
  		var newPassword = $('#users_profile_password').val();
  		var confirmPassword = $('#users_profile_confirm_password').val();
  	
		
  		console.log(newPassword);
  		console.log(confirmPassword);
  		
  		
		$.ajax({
		  	type: "POST",
		  	url: "../SystemSettings/Users",
		  	data: {
		  			'type':'updateprofile',
		  			'firstName':firstName,
		  			'laststName':laststName,
		  			'newPassword':newPassword,
		  			'confirmPassword':confirmPassword,
		  		   },
		  	success: function(data){
		  		console.log(data);
		  		
		  		if(data == 'empty_first_name'){
		  			swal(ERROR,FIRSTNAMEISEMPTY,"error");
		  		}else if(data == 'empty_last_name'){
		  			swal(ERROR,LASTNAMEISEMPTY,"error");
		  		}else if(data == 'password_not_match'){
		  			swal(ERROR,PASSWORDNOTMATCH,"error");
		  		}else if(data == 'update_success'){
		  			swal(SUCCESS,USERINFOUPDATESUCCESS,"success");
		  		}else if(data == 'no_changes'){
		  			swal(INFO,NOCHANGES,"info");
		  		}else if(data == 'invalid_user'){
		  			swal(ERROR,INVALIDUSER,"error");
		  		}
				/*if(data == "account_id_empty"){
					swal("<fmt:message key="ERROR" bundle="${messages}"/>","<fmt:message key="ACCOUNTIDEMPTY" bundle="${messages}"/>","error");
				}else if(data == "name_empty"){
					swal("<fmt:message key="ERROR" bundle="${messages}"/>","<fmt:message key="NAMEISREQUIRED" bundle="${messages}"/>","error");
				}else if(data == "sms_empty"){
					swal("<fmt:message key="ERROR" bundle="${messages}"/>","<fmt:message key="SMSISEMPTY" bundle="${messages}"/>","error");
				}else if(data == "authorized_empty"){
					swal("<fmt:message key="ERROR" bundle="${messages}"/>","<fmt:message key="AUTHORIZEDEMPTY" bundle="${messages}"/>","error");
				}else if(data == "update_success"){
					swal("<fmt:message key="SUCCESS" bundle="${messages}"/>","<fmt:message key="AGENTINFORUPDATESUCCESS" bundle="${messages}"/>","success");
				}else if(data == "password_not_match"){
					swal("Error","<fmt:message key="PASSWORDNOTMATCH" bundle="${messages}"/>","error");
				}else{
					swal("<fmt:message key="ERROR" bundle="${messages}"/>","<fmt:message key="INTERNALSERVERERROR" bundle="${messages}"/>","error");
				}*/
		  	}, error: function(data){
		  		console.log(data);
		  	}
  		})
	}
})