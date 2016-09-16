
$(document).ready(function(){
	
	var key = "";
	
	setInterval(function(){ 
		
		
		if(($.cookie('name') == undefined)){
			if($.cookie('name') == 'fa-pause'){
				$('#sounds_btn').addClass($.cookie('name'));
				$(this).removeClass('fa-pause');
			}else{
				$(this).removeClass('fa-play');
				$.cookie('name', 'fa-pause', { expires: 7 })
				$('#sounds_btn').addClass($.cookie('name'));
			}
		}
		
		console.log($.cookie('name'));
		
		jQuery.post(
			'../WithdrawDepositAlarm',
			'',
			function(data) {
				data = $.parseJSON(data);
				console.log(data.bankrequest);
				
				if(key == ""){
					console.log('save new key');
					key = data.bankrequest.key;
				}
				
				console.log(key+data.bankrequest.key);
				
				$('#withdraw_number').text(data.bankrequest.count);
				$('#end_operation_number').text(data.endoperation);
				$('.total').text((data.endoperation+data.bankrequest.count));
				
				if(data.bankrequest.key != ""){
					console.log("new request found...");
					if(data.bankrequest.key == key){
						console.log("play sounds...");
						 if(($.cookie('name') == undefined)){
					        	playSounds();
						 }else{
							if(($.cookie('name') == 'fa-pause')){
								playSounds();
							}else{
				        		document.getElementById('player').pause();
						        document.getElementById('player').currentTime = 0;
				        	}
						 }
					}else{
						console.log("stop sounds...");
						document.getElementById('player').pause();
				        document.getElementById('player').currentTime = 0;
				        key = data.bankrequest.key;
				        if(($.cookie('name') == undefined)){
				        	console.log("cookies is undefined");
				        	playSounds();
						}else{
							console.log("cookies is not undefined");
							if(($.cookie('name') == 'fa-pause')){
								console.log("cookies is playing");
								playSounds();
				        	}else{
				        		document.getElementById('player').pause();
						        document.getElementById('player').currentTime = 0;
				        	}
						}
					}
					
				}else{
					console.log("no request...");
					document.getElementById('player').pause();
			        document.getElementById('player').currentTime = 0;
				}
				
			}
		);
	}, 3000);
	
	
	
})

var playing = false;

function playSounds(){
	document.getElementById('player').play();
	playing = true;
}
	
$(document).on('click', '.fa-play', function(){
	$.removeCookie("name");
	$.cookie('name', 'fa-pause', { expires: 7 });
	$(this).removeClass('fa-play');
	$(this).addClass('fa-pause');
	
	playSounds();
	
	
});


$(document).on('click', '.fa-pause', function(){
	$.removeCookie("name");
	$.cookie('name', 'fa-play', { expires: 7 });
	$(this).removeClass('fa-pause');
	$(this).addClass('fa-play');
	document.getElementById('player').pause();
    document.getElementById('player').currentTime = 0;
});







