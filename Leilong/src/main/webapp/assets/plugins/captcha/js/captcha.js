var cd;

$(function(){
  CreateCaptcha();
});

// Create Captcha
function CreateCaptcha() {
  //$('#InvalidCapthcaError').hide();
//  var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
  var alpha = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
                    
  var i;
  for (i = 0; i < 6; i++) {
    var a = alpha[Math.floor(Math.random() * alpha.length)];
    var b = alpha[Math.floor(Math.random() * alpha.length)];
    var c = alpha[Math.floor(Math.random() * alpha.length)];
    var d = alpha[Math.floor(Math.random() * alpha.length)];
  }
  cd = a + ' ' + b + ' ' + c + ' ' + d;
  $('#CaptchaImageCode').empty().append('<canvas id="CapCode" class="capcode"></canvas>')
  
  var c = document.getElementById("CapCode"),
      ctx=c.getContext("2d"),
      x = c.width / 2,
      img = new Image();

  img.src = "https://pixelsharing.files.wordpress.com/2010/11/salvage-tileable-and-seamless-pattern.jpg";
  img.onload = function () {
      var pattern = ctx.createPattern(img, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font="46px Roboto Slab";
      ctx.fillStyle = '#ccc';
      ctx.textAlign = 'center';
      ctx.setTransform (1, -0.12, 0, 1, 0, 15);
      ctx.fillText(cd,x,55);
  };
  
  
}

// Validate Captcha
function ValidateCaptcha() {
  var string1 = removeSpaces(cd);
  var string2 = removeSpaces($('#UserCaptchaCode').val().toLowerCase());
  
  console.log(string1+ " | " + string2);
  
  if (string1 == string2) {
    return true;
  }
  else {
    return false;
  }
}

// Remove Spaces
function removeSpaces(string) {
  return string.split(' ').join('');
}

// Check Captcha
function CheckCaptcha() {
  var result = ValidateCaptcha();
  if( $("#UserCaptchaCode").val().toLowerCase() == "" || $("#UserCaptchaCode").val().toLowerCase() == null || $("#UserCaptchaCode").val().toLowerCase() == "undefined") {
    $('#WrongCaptchaError').text('Please enter code given below in a picture.').show();
    $('#UserCaptchaCode').focus();
    return false;
  } else {
    if(result == false) { 
      $('#WrongCaptchaError').text('Invalid Captcha! Please try again.').show();
      CreateCaptcha();
      $('#UserCaptchaCode').focus().select();
      return false;
    }
    else { 
      $('#UserCaptchaCode').attr('place-holder','Enter Captcha - Case Sensitive');
//      CreateCaptcha();
      $('#WrongCaptchaError').fadeOut(100);
      $('#SuccessMessage').fadeIn(500).css('display','block').delay(5000).fadeOut(250);
      return true;
    }
  }  
}