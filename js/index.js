function onSignIn(googleUser){

  var profile = googleUser.getBasicProfile().getEmail();

  if (profile.endsWith("@priorypanther.com") || profile.endsWith("@prioryca.org")){
    document.getElementById('grid').style.display='grid';

    var turnOff = document.getElementsByClassName("hide_after_login");
    var i;
    var j;
    for (i = 0; i < turnOff.length; i++) {
      turnOff[i].style.display = 'none';
    }
    var turnOn = document.getElementsByClassName("hide_until_login");
    for (j = 0; j < turnOn.length; j++) {
      turnOn[j].style.display = 'block';
    }

  }else{
    document.getElementById("wrong_email").style.display = "block";
    document.getElementById("logged_in").style.display = "block";
    document.getElementById("login_prompt").style.display = "none";
  }



}

function signOut() {
  document.getElementById('grid').style.display='none';
  document.getElementById("wrong_email").style.display = "none";

  var turnOn = document.getElementsByClassName("hide_after_login");
  var i;
  var j;
  for (i = 0; i < turnOn.length; i++) {
    turnOn[i].style.display = 'block';
  }
  var turnOff = document.getElementsByClassName("hide_until_login");
  for (j = 0; j  < turnOff.length; j++) {
    turnOff[j].style.display = 'none';
  }

  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });


}
