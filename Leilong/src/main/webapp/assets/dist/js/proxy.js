$(document).ready(function(){

	createTable();
	
	function createTable(){
		var index = 1;
		$('#proxytable').DataTable({
			"ajax": "../SystemSettings/Proxy?transaction=data",
	    	"columns": [
		      { "data": "accountId", render : function(data, type, full, meta){
         		return index++;
         	}},
         	{ "data": "status", render : function(data, type, full, meta){
         		if(data){
         			return ('<i class="fa fa-circle text-green">Active</i>');
         		}else{
         			return ('<i class="fa fa-circle text-red">Inactive</i>');
         		}
         	}},
            { "data": "proxyName" },
            { "data": "firstName" },
            { "data": "lastName", render : function(data, type, full, meta){
         		return (data == undefined ? '':data);
         	}},
         	{ "data": "dateAdded", render : function(data, type, full, meta){
         		return getFormattedDate(data);
         	}},		
         	{ "data": "availability", render : function(data, type, full, meta){
         		if(data){
         			return '<a href="#" class="btn btn-sm btn-warning proxy-update" data-proxy-id="'+full.id+'" data-proxy-name="'+full.proxyName+'" data-first-name="'+full.firstName+'" data-last-name="'+full.lastName+'">'+
		                		'<i class="fa fa-edit"></i> '+
		                	'</a> '+
		                	' <a href="#" class="btn btn-sm btn-success available" data-proxy-id="'+full.id+'" data-proxy-name="'+full.proxyName+'">'+
		                		'<i class="fa fa-plus"></i> '+AVAILABLE+
		                	'</a>';
         		}else{
         			return '<a href=#" class="btn btn-sm btn-warning proxy-update" data-proxy-id="'+full.id+'" data-proxy-name="'+full.proxyName+'" data-first-name="'+full.firstName+'" data-last-name="'+full.lastName+'">'+
		                		'<i class="fa fa-edit"></i> '+
		                	'</a> '+
		                	' <a href=#" class="btn btn-sm btn-danger unavailable" data-proxy-id="'+full.id+'" data-proxy-name="'+full.proxyName+'">'+
		                		'<i class="fa fa-plus"></i> '+UNAVAILABLE+
		                	'</a>';
         		}
         		
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
	
	
	$(document).on('click', '.available', function(){
		openConfirmationAlert($(this).data('proxy-id'), $(this).data('proxy-name'), false, CHANGETOUNAVAILABLE);
	});
	
	
	$(document).on('click', '.unavailable', function(){
		openConfirmationAlert($(this).data('proxy-id'), $(this).data('proxy-name'), true, CHANGETOAVAILABLE);
	});
	
	function openConfirmationAlert(id, name, status, label){
		swal({
			  title: name,
			  text: label,
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: YESCHANGEIT,
			  cancelButtonText: NOCANCEL,
			  confirmButtonClass: 'btn btn-success',
			  cancelButtonClass: 'btn btn-danger',
			  buttonsStyling: false
			}).then(function(isConfirm) {
			  if (isConfirm === true) {
				  sendAvailabilityStatus(id, name, status);
			    
			  } else if (isConfirm === false) {
			    swal(
			      CANCELLED,
			      TRANSACTIONCANCELLED,
			      'error'
			    );
			  }
		})

	}
	
	function sendAvailabilityStatus(id, name, status){
		$.ajax({
	  		type: "POST",
	  		url: '../SystemSettings/Proxy',
	  		data: {'transaction':'updateavailability', 'name':name, 'id':id, 'status':status},
	  		success: function(data){
	  			if(data == 'success'){
	  				swal(
  				      	SUCCESS,
  				      	PROXYUPDATESUCCESS,
  				      	'success'
  				    );
	  			} else{
	  				swal(
    				    ERROR,
    				    TRANSACTIONCANCELLED,
    				    'error'
    				);
  	  			}
	  			createTable();
	  		  }
		})
	}
	
	$(document).on('click','.proxy-update', function(){
		var proxyName = $(this).data('proxy-name');
		var firstName = $(this).data('first-name');
		var lastName = $(this).data('last-name');
		var proxyId = $(this).data('proxy-id');
		
		
		$('#proxy_update_add').modal({
			keyboard: false,
			backdrop: 'static'
		})
		
		$('#proxy_name').val(proxyName);
		$('#first_name').val(firstName);
		$('#last_name').val(lastName);
		$('#proxy_id').val(proxyId);
		
	});
	
	$(document).on('click','#submit_proxy_information', function(){
		var proxyName = $('#proxy_name').val();
		var firstName = $('#first_name').val();
		var lastName = $('#last_name').val();
		var proxyId = $('#proxy_id').val();
		
		$.ajax({
	  		type: "POST",
	  		url: '../SystemSettings/Proxy',
	  		data: {'proxyName':proxyName, 'firstName':firstName, 'lastName':lastName, 'proxyId':proxyId, 'transaction':'updatenewproxy'},
	  		success: function(data){
	  			console.log(data);
	  			if(data == 'proxyname_empty'){
	  				swal(
						 	ERROR,
						  PROXYNAMEEMPTY,
						  'success'
						)
	  			}else if(data == 'firstname_empty'){
	  				swal(
						  ERROR,
						  FIRSTNAMEEMPTY,
						  'success'
						)
	  			}else if(data == 'lastname_empty'){
	  				swal(
						  ERROR,
						  LASTNAMEEMPTY,
						  'success'
						)
	  			}else if(data == 'add_success'){
	  				$('#proxy_update_add').modal('toggle');
	  				swal(
						  SUCCESS,
						  ADDPROXYSUCCESS,
						  'success'
						)
	  			}else if(data == 'add_unsuccess'){
	  				$('#proxy_update_add').modal('toggle');
	  				swal(
						  ERROR,
						  ADDPROXYUNSUCCESS,
						  'success'
						)
	  			}else if(data == 'update_success'){
	  				$('#proxy_update_add').modal('toggle');
	  				swal(
						  SUCCESS,
						  UPDATEPROXYSUCCESS,
						  'success'
						)
	  			}else if(data == 'update_unsuccess'){
	  				$('#proxy_update_add').modal('toggle');
	  				swal(
						  ERROR,
						  UPDATEPROXYUNSUCCESS,
						  'success'
						)
	  			}
	  			createTable();
	  		}
		});
	});
	
	$(document).on('click','#add_new_proxy', function(){
		$('#proxy_update_add').modal({
			keyboard: false,
			backdrop: 'static'
		})

		$('#proxy_name').val('');
		$('#first_name').val('');
		$('#last_name').val('');
		$('#proxy_id').val(0);

	});
	
	$(document).on('click','#proxy_availability_notification', function(){
		
		swal({
			  title: PROXYNOTIFICATION,
			  text: UPDATEPROXYNOTIFICATION,
			  type: 'info',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: YESCHANGEIT,
			  cancelButtonText: NOCANCEL,
			  confirmButtonClass: 'btn btn-success',
			  cancelButtonClass: 'btn btn-danger',
			  buttonsStyling: false
			}).then(function(isConfirm) {
			  if (isConfirm === true) {
				  sendUpdateProxyAvailabilityNotification();
			  } else if (isConfirm === false) {
			    
			  }
		})
		
		
		
	});
	
	function sendUpdateProxyAvailabilityNotification(){
		$.ajax({
	  		type: "POST",
	  		url: '../SystemSettings/Proxy',
	  		data: {'transaction':'updateavailabilitynotification'},
	  		success: function(data){
				swal({
					title: SUCCESS,
					text: PROXYNITFUPDATESUCCESS,
					timer: 3500
				})
				location.reload();
	  		}
		});
	}

	function getFormattedDate(date) {
    	var now = new Date(date);
    	return now.format("yyyy-mm-dd HH:mm:ss");
    }
	
})
