// JavaScript Document
/*All functions for index.php*/
function checkUsername(val) {
  $.post("checkusername.php", {newuser : $( '#newuser' ).val()},function(data){$('#regstatus').val(data)} );
}

$(document).ready(
	function() {
    	$('#registerbtn').click( function(event)
		{	
		event.preventDefault();
		if($('#regstatus').val() != "Username already taken."){
				if($( '#newuser' ).val() != '' && $( '#newpass' ).val() != ''){
					$.post("register.php", 
						{
							newuser : $( '#newuser' ).val(),
							newpass : $( '#newpass' ).val(),
						}, 
						function(data){$('#regstatus').val(data)});		
				}
		}
		});
	}
);
$(document).ready(
	function() {
    	$('#loginbtn').click( function(event)
		{
			event.preventDefault();
			$.post("login.php", 
				{
					username : $( '#username' ).val(),
					password : $( '#password' ).val(),
				}, 
				function(data){$('#logstatus').val(data)});
		});
	}
);


/*All functions for apps.php*/
$(document).ready(
	function() {
    	$('#addbtn').click( function()
		{
			$.post("addapp.php", 
				{
					username : $( '#username' ).val(),
					position : $( '#position' ).val(),
					company : $( '#company' ).val(),
					status : $( '#status' ).val(),
					date_applied : $( '#date_applied' ).val(),
					date_closing : $( '#date_closing' ).val(),
					fileupload : $( '#fileupload' ).val(),
				}, 
				function(data){$('#addstatus').val(data)});
				document.getElementById("newapp").reset()
		});
	}
);


setInterval(function(){
	$( ".tablediv" ).load( "fetchapps.php" );
}, 10000);






function checkDate(field)
  {
    var allowBlank = true;
    var errorMsg = "";

    // regular expression to match required date format
    re = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/;

    if(field.value != '') {
      if(regs = field.value.match(re)) {
          if(regs[1] < 1900 || regs[1] > 2020) {
          	errorMsg = "Invalid value for year: " + regs[3] + " - must be between " + 1900 + " and " + 2020;
        } else if(regs[2] < 1 || regs[2] > 12){
          	errorMsg = "Invalid value for month: " + regs[1];
        } else if(regs[3] < 1 || regs[3] > 31) {
          	errorMsg = "Invalid value for day: " + regs[2];
        }
      } else {
        errorMsg = "Invalid date format: " + field.value;
      }
    } else if(!allowBlank) {
      errorMsg = "Empty date not allowed!";
    }

    if(errorMsg != "") {
      alert(errorMsg);
      field.focus();
      return false;
    }

    return true;
  }