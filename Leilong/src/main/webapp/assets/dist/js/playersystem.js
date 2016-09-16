$(document).ready(function(){
	
	createTable();
	
	function createTable(){
		var index = 1;
		$('#agentlisttable').DataTable({
			"ajax": "../AgentSystem/AgentPlayerList?type=viewplayerasjson",
	    	"columns": [
		            { "data": "accountId", render : function(data, type, full, meta){
		         		return index++;
		         	}},
		         	{ "data": "status", render : function(data, type, full, meta){
		         		if(full.passwordChange == false){
		         			return ('<i class="fa fa-circle text-red">'+INACTIVE+'</i>');
		         		}else{
		         			return (data ? '<i class="fa fa-circle text-green">'+ACTIVE+'</i>':'<i class="fa fa-circle text-red">'+DISABLED+'</i>');
		         		}
		         	}},
		            { "data": "username" },
		            { "data": "accountId", render : function(data, type, full, meta){
		         		return (data == undefined ? '':data);
		         	}},
		         	{ "data": "agentAccount" },
		         	{ "data": "balance" },
		         	{ "data": "frozen" },
		         	{ "data": "pending" },
		         	{ "data": "commission" },
		         	{ "data": "currency", render : function(data, type, full, meta){
		         		return data.currency;
		         	}},
		         	{ "data": "dateCreated", render : function(data, type, full, meta){
		         		return getFormattedDate(data);
		         	}},
		         	{ "data": "username", render : function(data, type, full, meta){
		         		
		         		var view = '<button class="btn btn-default btn-sm" disabled data-toggle="tooltip" data-placement="left" title="View"><i class="fa fa-eye"></i></button>';
		         		if(full.passwordChange == true){
		         			view = '<button class="btn btn-default btn-sm agentinformations" data-toggle="tooltip" data-placement="left" title="View" data-username="'+full.username+'" data-status="'+full.status+'" data-agentid="'+full.id+'"'+
					  		'data-agentaccount="'+full.agentAccount+'" data-balance="'+full.balance+'" data-frozen="'+full.frozen+'" data-pending="'+full.pending+'" '+
						  	'data-commission="'+full.commission+'" data-sharing="'+full.sharing+'" data-currency="'+full.currency.currency+'" data-phone="'+full.phone+'"'+
						  	'data-email="'+full.email+'" data-datecreated="'+full.dateCreated+'" data-modified="'+full.dateModified+'" data-password="'+full.password+'" '+
						  	'data-firstname="'+full.firstName+'" data-lastname="'+full.lastName+'"  data-securitydeposit="'+full.securityDeposit+'" data-commission="'+full.commission+'"'+
						  	'data-notes="'+full.notes+'" data-currencyid="'+full.currency.id+'" data-name="'+(full.name == undefined ? "" : full.name)+'" data-accountid="'+(full.accountId == undefined ? "" : full.accountId)+'"'+
						  	'data-contact-phone="'+(full.contactPhone == undefined ? "" : full.contactPhone)+'" data-authorized-phone="'+(full.authorizePhone == undefined ? "" : full.authorizePhone)+'"'+
						  	'data-date-added="'+(full.dateCreated == undefined ? "" : full.dateCreated)+'" data-date-modified="'+(full.dateModified == undefined ? "" : full.dateModified)+'">'+
						  	'<i class="fa fa-eye"></i> <!-- <fmt:message key="EDIT"/> --></button> ';
		         		}
		         		
		         		return view+
						  	
						  	
						  	(loginaccountttpe == 'users' ? '' : ' <button class="btn btn-default btn-sm agent-to-player-money-transfer" data-toggle="tooltip" data-placement="left" title="Money Transfer" data-username="'+full.username+'" data-status="'+full.status+'" data-agentid="'+full.id+'"'+
					  		'data-agentaccount="'+full.agentAccount+'" data-balance="'+full.balance+'" data-frozen="'+full.frozen+'" data-pending="'+full.pending+'" '+
						  	'data-commission="'+full.commission+'" data-sharing="'+full.sharing+'" data-currency="'+full.currency.currency+'" data-phone="'+full.phone+'"'+
						  	'data-email="'+full.email+'" data-datecreated="'+full.dateCreated+'" data-modified="'+full.dateModified+'" data-password="'+full.password+'" '+
						  	'data-firstname="'+full.firstName+'" data-lastname="'+full.lastName+'"  data-securitydeposit="'+full.securityDeposit+'" data-commission="'+full.commission+'"'+
						  	'data-notes="'+full.notes+'" data-currencyid="'+full.currency.id+'" data-name="'+full.name+'" data-accountid="'+(full.accountId == undefined ? "" : full.accountId)+'"'+
						  	'data-contact-phone="'+(full.contactPhone == undefined ? "" : full.contactPhone)+'" data-authorized-phone="'+(full.authorizePhone == undefined ? "" : full.authorizePhone)+'"'+
						  	'data-date-added="'+(full.dateCreated == undefined ? "" : full.dateCreated)+'" data-date-modified="'+(full.dateModified == undefined ? "" : full.dateModified)+'">'+
						  	'<i class="fa fa-code-fork"></i></button>');
		         	}},
		        ],
	        "paging": true,
	        "lengthChange": true,
	        "searching": true,
	        "ordering": true,
	        "info": true,
	        "autoWidth": true,
	        "destroy":true,
	        "iDisplayLength": 20,
	        "lengthMenu": [[20, 50, 500, -1], [20, 50, 500, "All"]],
	        
	        "language": {
	            "url": url
	        }
	    });
	};
	
	$(document).on("click", ".agentinformations", function() {
		$('#agents_information_modal').modal({
			keyboard: false,
			backdrop: 'static'
		})
		
		
		
		$('#agents_information_name').attr('readonly', 'readonly');
		$('#agents_information_account_id').attr('readonly', 'readonly');
		$('#agents_information_email').attr('readonly', 'readonly');
		$('#agents_information_sms_number').attr('readonly', 'readonly');
		$('#agents_information_authorized_number').attr('readonly', 'readonly');
		$('#agents_information_phone_number').attr('readonly', 'readonly');
		$('#submitupdatesbtn').css('display', 'none');
		
		
		$('#agents_information_username').val($(this).data('username'));
		$('#agents_information_parent_agent').val($(this).data('agentaccount'));
		$('#agents_information_name').val(($(this).data('name') == 'undefined' || $(this).data('name') == undefined) ? '' : $(this).data('name'));
		$('#agents_information_account_id').val($(this).data('accountid'));
		$('#agents_information_email').val($(this).data('email'));
		$('#agents_information_sms_number').val($(this).data('contact-phone'));
		$('#agents_information_authorized_number').val($(this).data('authorized-phone'));
		$('#securitydeposit').val($(this).data('securitydeposit'));
		$('#agents_information_phone_number').val(($(this).data('phone') == 'undefined' || $(this).data('phone') == undefined) ? '' : $(this).data('phone'));
		$('#agents_information_balance').val($(this).data('balance'));
		$('#agents_information_commission').val($(this).data('commission'));
		$('#agents_information_currency').val($(this).data('currency'));
		$('#agents_information_pending_balance').val($(this).data('pending'));
		$('#agents_information_frozen_balance').val($(this).data('frozen'));
		$('#agents_information_date_modified').val(getFormattedDate($(this).data('date-modified')));
		$('#agents_information_date_added').val(getFormattedDate($(this).data('date-added')));		
		$('#notesdiv1').empty();
		if ($(this).data('notes') != ''){
			$('#notesdiv1').append('<label class="text-red">Notes:  </label>'+$(this).data('notes'));
		}		
		$('#agent_status').empty();
		console.log($(this).data('status') == 'true');
		if($(this).data('status')){
			$('#agent_status').append('<label><input type="checkbox" id="agent_stats" class="check" checked="checked"> Active</label>');
		}else{
			$('#agent_status').append('<label><input type="checkbox" id="agent_stats" class="check"> Active</label>');
		}
		
		$('input').iCheck({
          checkboxClass: 'icheckbox_square-blue',
          radioClass: 'iradio_square-blue',
          increaseArea: '20%' // optional
        });  
	})
	
	$(document).on("click", "#newagent", function() {
		$('#new_agents_modal').modal({
			keyboard: false,
			backdrop: 'static'
		})
		$('#notesdiv').empty();
		$('#username').val('');
		$('#password').val('');
		$('#retypepassword').val('');
		$('#firstname').val('');
		$('#lastname').val('');
		$('#phone').val('');
		$('#email').val('');
		$('#securitydeposit').val('');
		$('#commission').val('');
		$('#balance').val('');
		$('#name').val('');
		$('#type').val('savenewagents');
		$('#currency').empty();
		$('#username_prefix').val('');
		$('#username_prefix').attr('maxlength',2);
		$('#username_prefix').removeAttr('disabled');
		
		$('#mainagent').empty();
		if(loginaccountttpe == 'users'){
			var currency = getAllAgents();
			getCurrency('all');			
		}else{
			$('#username_prefix').val(loginusername.substring(0, 2).toUpperCase());
			$('#username_prefix').attr('readonly', 'readonly');
			$('#mainagent').append('<option value="'+loginusername+'">'+loginusername+'</option>');
			$('#currency').append('<option value="'+logincurrencyid+'">'+logincurrency+'</option>');
			
		}
		
		$("#balance").numeric(',');
	})
	
	
	function getCurrency(curdata){
		
		console.log('triggered...'+curdata);
		
		$.ajax({
	  		  type: "POST",
	  		  url: '../SystemSettings/Currency',
	  		  data: {'transaction':'currencyasjson'},
	  		  success: function(data){
	  			  var data = $.parseJSON(data);
	  			  
	  			  console.log(data);
	  			  
	  			  $.each(data, function( index, element ) {
	  				  if(curdata == 'all'){
	  					  
	  					  console.log("updateUrl : "+updateUrl);
	  					  
//	  					if(updateUrl == 'NewAgents'){
	  						$('#currency').append('<option value="'+element.id+'">'+element.currency+'</option>');
//	  					}
	  				  }
	  				
	  			  })
	  		  }
		})
	}

	function getAllAgents(){
		$.ajax({
	  		  type: "POST",
	  		  url: 'AgentsList',
	  		  data: {'transaction':'agenttojson'},
	  		  success: function(data){
	  			  var data = $.parseJSON(data);
	  			  if(updateUrl == 'NewAgents'){
		  			  $('#mainagent').append('<option value="admin">admin</option>');  
	  			  }else{
	  				$('#mainagent').append('<option value="admin">--select--</option>');  
	  			  }
	  			  $.each(data, function( index, element ) {
	  				 	$('#mainagent').append('<option value="'+element.username+'" data-currencyname="'+element.currency.currency+'" data-currencyid="'+element.currency.id+'">'+element.username+'</option>');
	  			  })
	  		  }
		})
		
		
	}
	
	//=============================================================================================================================
	// submit agentsinformation
	//=============================================================================================================================
	
	$(document).on("click","#submitplayerbtn", function(){
		
		var usernamePrefix = $('#username_prefix').val();
		var username 	= $('#username').val();
		
		var matchesUsernamePrefix = usernamePrefix.match(/\d+/g);
    	var matchesUsername = username.match(/\d+/g);
    	
    	if (matchesUsernamePrefix != null) {
    		swal(ERROR, INVALIDPREFIX, "error"); 
    		return;
    	}
    	
    	if(!$.isNumeric(username)){
    		swal(ERROR, INVALIDUSERNAME, "error"); 
    		return;
    	}
    	
    	if(username.length < 3 || username.length > 6){
    		swal(ERROR, INVALIDUSERNAME, "error"); 
    		return;
    	}
		
		
		var balance 		= $('#balance').val(),
		currency 		= $('#currency :selected').val(),
		main			= $('#mainagent :selected').val(),
		name			= $('#name').val()
		
		$('#agents_information_modal_message').empty();
		 
		$.ajax({
	  		  type: "POST",
	  		  url: "../AgentSystem/AgentPlayerList",
	  		  data: {'type':'savenewagents',
	  			  'username':usernamePrefix+username,
	  			  'balance':balance,
	  			  'currency':currency,
	  			  'main':main,
	  			  'name':name
	  			},
	  		  success: function(data){
	  			  
	  			  if(data == 'username_empty'){
	  				  swal(ERROR, "Agent ID is required.", "error"); 
	  			  }else if(data == 'invalid_name'){
	  				  swal(ERROR, NAMEISREQUIRED, "error"); 
	  			  }else if(data == 'invalid_number'){
	  				  swal(ERROR, BALANCEISREQUIRED, "error"); 
	  			  }else if(data == 'invalid_commission'){
	  				  swal(ERROR, "Invalid commission value.", "error"); 
	  			  }else if(data == 'addsuccess'){
	  				  $('#new_agents_modal').modal('toggle');
	  				  swal("Success", NEWPLAYERADDSUCCESS, "success"); 
	  			  }else if(data == 'agent_exist'){
	  				  swal(ERROR, PLAYEREXIST, "error");
	  			  }else if(data == 'invalid_type' || data == ""){
	  				  swal(ERROR, "Invalid transaction type.", "error"); 
	  			  }else if(data == 'agent_not_enough_balance'){
	  				  swal(ERROR, AGENTNOTENOUGHBALANCE, "error"); 
	  			  }else{
	  				$('#new_agents_modal').modal('toggle');
	  				  swal(ERROR, INTERNALSERVERERROR, "error"); 
	  			  }
	  			  createTable();
	  	      	}
	  		});  
  			
	 	});
	
	
	
	$(document).on("change","#mainagent", function(){
		
		console.log($('#mainagent :selected').val());
		
		$('#currency').empty();
		if($('#mainagent :selected').val() == 'admin'){
			getCurrency('all');	
			$('#username_prefix').val("");
			$('#username_prefix').removeAttr('disabled');
		}else{
			$('#username_prefix').val($(this).val().substring(0, 2).toUpperCase());
			$('#username_prefix').attr('disabled', 'disabled');
			$('#currency').append('<option value="'+$('#mainagent :selected').data('currencyid')+'">'+$('#mainagent :selected').data('currencyname')+'</option>');
		}
	});
	
	/*Input Number Only*/
//    $('#balance, #securitydeposit, #commission').keypress(function(key) {
//    	// Allow only backspace and delete
//        if(key.charCode < 48 || key.charCode > 57) return false;
//    });
    
    $(document).on("click","#enable_edit_btn", function(){
    	$('#agents_information_name').removeAttr('readonly');
		$('#agents_information_account_id').removeAttr('readonly');
		$('#agents_information_email').removeAttr('readonly');
		$('#agents_information_sms_number').removeAttr('readonly');
		$('#agents_information_authorized_number').removeAttr('readonly');
		$('#agents_information_phone_number').removeAttr('readonly');
		$('#submitupdatesbtn').css('display', '');
    });
    
    $(document).on("click","#submitupdatesbtn", function(){
    	var name = $('#agents_information_name').val(),
		accountId = $('#agents_information_account_id').val(),
		email = $('#agents_information_email').val(),
		smsNumber = $('#agents_information_sms_number').val(),
		authorizedNumber = $('#agents_information_authorized_number').val(),
		phoneNumber = $('#agents_information_phone_number').val();
    	
    	
    	$.ajax({
	  		  type: "POST",
	  		  url: '../AgentSystem/AgentPlayerList',
	  		  data: {'type':'edit',
	  			  'name':name,
	  			  'accountId':accountId,
	  			  'email':email,
	  			  'smsNumber':smsNumber,
	  			  'authorizedNumber':authorizedNumber,
	  			  'phoneNumber':phoneNumber,
	  			  'agentType':'agents',
	  			  'agentId':$('#agents_information_username').val(),
	  			  'agentStatus':$('#' + 'agent_stats').is(":checked"),
	  			},
	  		  success: function(data){
	  			
	  			  console.log(data);
	  			  
	  			if(data == 'agent_not_exist'){
	  				  swal(ERROR, AGENTIDNOTEXIST, "error"); 
	  				  $('#agents_information_modal').modal('hide');
	  			  }else if(data == 'update_error'){
	  				  swal(ERROR, UPDATEERROR, "error"); 
	  				  $('#agents_information_modal').modal('hide');
	  			  }else if(data == 'empty_name'){
	  				  swal(ERROR, NAMEISREQUIRED, "error"); 
	  			  }else if(data == 'empty_agentid'){
	  				  swal(ERROR, AGENTIDREQUIRED, "error"); 
	  			  }else if(data == 'empty_email'){
	  				  swal(ERROR, EMAILISREQUIRED, "error"); 
	  			  }else if(data == 'empty_sms_number'){
	  				  swal(ERROR, SMSISEMPTY, "error"); 
	  			  }else if(data == 'empty_authorized_number'){
	  				  swal(ERROR, AUTHORIZEDEMPTY, "error"); 
	  			  }else if(data == 'empty_phone_number'){
	  				  swal(ERROR, PHONENUMBERISEMPTY, "error"); 
	  			  }else if(data == 'empty_account_id'){
	  				  swal(ERROR, ACCOUNTIDEMPTY, "error"); 
	  			  }else if(data == 'authorize_no_exist'){
	  				  swal(ERROR, AUTHORIZEDNUMBERALREADYEXIST, "error"); 
	  			  }else if(data == 'update_success'){
	  				  swal(SUCCESS, AGENTINFORUPDATESUCCESS, "success"); 
	  				  $('#agents_information_modal').modal('hide');
	  			  }else{
	  				  swal(ERROR, INTERNALSERVERERROR, "error"); 
	  				$('#agents_information_modal').modal('hide');
	  			  }
	  			  createTable();
	  	      	}
	  		}); 
    });
    
    $(document).on("click",".agent-to-player-money-transfer", function(){
    	var agentId = $(this).data('username');
    	var parentAgent = $(this).data('agentaccount');
    	var playerBalance = $(this).data('balance');
    	$('#money_transfer_username').val(agentId);
		$('#money_transfer_player_id').val(parentAgent);
		$('#money_transfer_player_available_balance').val(playerBalance);
		
    	$('#agent_money_transfer_modal').modal({
			keyboard: false,
			backdrop: 'static'
		})
		
		$.ajax({
	  		  type: "POST",
	  		  url: "../AgentSystem/AgentsList",
	  		  data: {'transaction':'parentagentinfo'
	  			},
	  		  success: function(data){
	  			  var data = $.parseJSON(data);
	  			$('#money_transfer_agent_available_balance').val(data.balance);
	  			
	  		  }
		 });
    })
    
    
    
    $(document).on("click", "#submit_money_transfer_btn", function(){
    	$('#agent_money_transfer_modal').modal('toggle');
    	openPasswordModalForTransferMoney();	
    });
    
    
    function openPasswordModalForTransferMoney(){
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
			      		validationCurrenctPasswordForAgents(value, function(requestResult) {
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

				var agentAvailableBalance = $('#money_transfer_agent_available_balance').val();
				var moneyTransferAmount = $('#money_transfer_amount').val();
				var agentId = $('#money_transfer_username').val();
				
				AJAXRequestForMoneyTransfer(
					'POST', 
					'../AgentSystem/AgentsList',
					{	'transaction':'parentagentpinvalidations', 
						'moneyTransferAmount':moneyTransferAmount,
						'agentId':agentId,  
						'agentType':'players'
					}
				)
			}
		})
	}

	function validationCurrenctPasswordForAgents(password, cb){
		$.ajax({
		  	type: "POST",
		  	url: "../AgentInformations",
		  	data: {'transaction':'playerpinvalidation',
		  		'pin':password,
		  		'agentplayer':$('#money_transfer_username').val()
		  	},success: function(data){
		   		cb(data);
		  	}
		});
	}

	function AJAXRequestForMoneyTransfer(method, api, data) {
		$.ajax({
  		  	type: method,
  		  	url: api,
  		  	data: data,
  		  	success: function(response) {
  			 	if (response === 'pin_not_set') {
					swal(WARNING, PINNOTSET, 'warning')
				}else if(response == 'invalid_pin'){
					swal(WARNING, INVALIDPIN, 'warning')
				}else if(response == 'invalid_amount'){
					swal(ERROR, INVALIDAMOUNT, 'error')
					$('#agent_money_transfer_modal').modal('toggle');
				}else if(response == 'invalid_agent'){
					swal(ERROR, INVALIDAGENTNAME, 'error')
					$('#agent_money_transfer_modal').modal('toggle');
				}else if(response == 'success'){
					swal(SUCCESS, TRANSFERSUCCESS, 'success')
					createTable();
				}else if(response == 'not_enough_balance'){
					swal(WARNING, NOTENOUGHBALANCE, 'warning')
					$('#agent_money_transfer_modal').modal('toggle');
				}else if(response == 'no_permission'){
					swal(WARNING, NOTPERMISSIONTOTRANSFERMONEY, 'warning')
				}else if(response == 'main_agent_account'){
					swal(ERROR, MAINAGENTACCOUNT, 'error')
				}else {
					swal(ERROR, INTERNALSERVERERROR, 'error')
				}
  		  	},
  			error: function(data) {
	  			console.log(data);
	  		}
    	
    	});
    }

    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass: 'iradio_flat-green'
    });
    
    $('#main_agent_transfer').on('ifChecked', function(event){

    	$.ajax({
	  		  type: "POST",
	  		  url: "../AgentSystem/AgentsList",
	  		  data: {'transaction':'parentagentinfo'
	  			},
	  		  success: function(data){
	  			  var data = $.parseJSON(data);
	  			  $('#money_transfer_username').val(data.agentAccount);
	  			  $('#money_transfer_player_available_balance').val('*****');
	  			  
	  		  }
		 });
	});
    
    $('#sub_agent_transfer').on('ifChecked', function(event){
    	var player = $('#player_username_transfer').val();
    	console.log(player);
    	$.ajax({
	  		  type: "POST",
	  		  url: "../AgentSystem/AgentsList",
	  		  data: {'transaction':'playerinfo', 'account':player
	  			},
	  		  success: function(data){
	  			  var data = $.parseJSON(data);
	  			  $('#money_transfer_username').val(data.username);
	  			  $('#money_transfer_player_available_balance').val(data.balance);
	  		  }
		 });
	});
    
    
    
    function getFormattedDate(date) {
    	var now = new Date(date);
    	return now.format("yyyy-mm-dd HH:mm:ss");
    }
    
    
    $(document).on('keyup','#username_prefix', function(){
        this.value = $(this).val().toUpperCase();
    });
    
    $('#username').numeric();
})

