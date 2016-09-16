var SESSIONKEY = 'SESSIONKEYSESSIONKEYSESSIONKEY';
$(document).ready(function(){

  
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE");

    console.log(msie);
  
  //=================================================================================================================
  // send login request 
  //=================================================================================================================

  $("#submitlogin").click(function(e){
    e.preventDefault();
    var accountid = $( "#accountid").val();
    var password = $( "#password" ).val();

    $.ajax({
      type:"POST",
      "async": true,
      "crossDomain": true,
      url: "http://192.168.1.7:8011/LoginApi/Login",
      data: { 'accountid':accountid, 
              'password':password,
              'domain':'leilong.com',
              'key':'test',
      },
      beforeSend: function(){
        //=================================================================================================================
        // remove has error class before submit and validate if account id or password is empty and add class has-error 
        //=================================================================================================================
        $('#usernamediv').removeClass('has-error');
        $('#passworddiv').removeClass('has-error');
        if(accountid == ''){
          $('#usernamediv').addClass('has-error');
          return false;
        }
         if(password == ''){
          $('#passworddiv').addClass('has-error');
          return false;
        }
        //=================================================================================================================
        // rename Login in to Logging in... to notify players that the system is trying to login and contact BO login API
        //=================================================================================================================
        $('#submitlogin').text('在登錄....');
      },
      success: function(data) {
        $('#submitlogin').text('登录');
        var data = $.parseJSON(data);
        console.log(data);
        $('#message').empty();
        if(data.status == 1 && data.description == 'SUCCESS'){
          $.session.set(data.SESSIONKEY, JSON.stringify(data.logindata));
          console.log('session created... Player successfully loggedin.');
          location.reload();
        }else if(data.status == 4 && data.description == 'INVALID USERS'){
            $('#message').append('<div class="alert alert-danger alert-dismissible" role="alert">'+
              '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
              '<strong>錯誤!</strong> 無效的用戶名和密碼.'+
            '</div>');
        }else{
            $('#message').append('<div class="alert alert-warning alert-dismissible" role="alert">'+
              '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
              '內部服務器錯誤.'+
            '</div>');
        }
      }
    });
  });



  //=================================================================================================================
  // get session data
  //=================================================================================================================
  $('#loginlogoutcontrol').empty();
  $("#betting_history_a").attr("href", "#");
  var answer = $.session.get(SESSIONKEY);
  //=================================================================================================================
  // validate session data if undefined
  //=================================================================================================================
  if(typeof answer == 'undefined'){
    $('#loginlogoutcontrol').append('<a href="#" data-toggle="modal" data-target="#login_modal">登录</a>');
  }else{
    $("#betting_history_a").attr("href", "#betting_history");
    $('#loginlogoutcontrol').append('<a href="#" id="logout">Logout</a>');

    $( "#betting_history" ).load( "betting-history-table.html", function( response, status, xhr ) {
      if ( status == "error" ) {
        var msg = "Sorry but there was an error: ";
        $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
      }
      var data = $.parseJSON(answer);
      $('#betting-history').DataTable({
          "async": true,
          "crossDomain": true,
          ajax: {
          url: 'http://192.168.1.7:8011/BettingHistoryApi/AgentDetailedWinlossAllData',
          type: 'POST',
          'data': data,
        },
        "columns": [
            { "data": "id"},
            { "data": "account_id"},
            { "data": "provider"},
            { "data": "transaction_id"},
            { "data": "bet_amount"},
            { "data": "mc_win_loss"},
            { "data": "actual_betting"},
            { "data": "mc_total"},
            { "data": "revenue"},
            { "data": "pl_total"},
            { "data": "balance_before"},
            { "data": "balance_after"}, 
            { "data": "bet_time"},
            { "data": "result"},
            { "data": "betting"},
            { "data": "status"},
            { "data": "ip_address"},
        ],
        "language": {
            "lengthMenu": "Showing _MENU_ Records",
            "zeroRecords": "No records found.",
            "info": "Showing _PAGE_ of _PAGES_ Pages",
            // "infoEmpty": "No records available.",
            "infoFiltered": "filtered from _MAX_ total records.",
            "paginate": {
              "previous": "Previous",
              "next": "Next"
            },
            "search": "Search",
          }
      });
    });
   
    console.log('reinitialized datatables...')
  }
  //=================================================================================================================
  // logout
  //=================================================================================================================
  $(document).on('click','#logout', function() {
    console.log('logout...');
    $.session.remove(SESSIONKEY);
    location.reload();
  });
  //=================================================================================================================
  // validate if player logged in and pop up login modal if not
  //=================================================================================================================
  $(document).on('click','#betting-history-li', function() {
    var answer = $.session.get(SESSIONKEY);
    if(typeof answer == 'undefined'){
      $('#login_modal').modal('toggle');
    }
    return false;
  });















  $("#session-clear").submit(function(e){
    e.preventDefault();
    var clearkey = $( "input[name=session-clear]").val();
    $.session.remove(clearkey);
    $(".response-clear span").html(clearkey+" removed successfully.");
    $( "input[name=session-clear]").val("");
  });
  
  $("#session-check").submit(function(e){
    e.preventDefault();
    var checkkey = $( "input[name=input-check]").val();
    var answer = $.session.get(checkkey);
    if(answer != undefined){
      $(".storage-val strong span").html(answer);
    }else{
      $(".storage-val strong span").html("Undefined");
    }
    $( "input[name=input-check]").val("");
  });
  
  $(".removeall").on("click",function(e){
    e.preventDefault();
    $.session.clear();
    $(".response-removeall span").html("All session variables are removed.");
  });
  
  $(".pageload").on("click",function(e){
    e.preventDefault();
    var checksession = $.session.get('test');
    if(checksession != undefined){
      $(".page-content").load("templates/index.html");
    }else{
      $(".page-content").html("Please add 'test' variable in left box to access this page.<br>Ex : Key = 'test' & value = 'test'");
    }
  });
});