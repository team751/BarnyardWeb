function checkLogin() {
    console.log("loaded")

    if(!navigator.cookieEnabled) {
        $('alert-placeholder').html('<div id="cookiealert" class="alert alert-warning">' +
                                    '<span>Cookies aren\'t enabled! Please enable them to use '+
                                    'Barnyard-Web</span></div>')
    }

    const auth2 = gapi.auth2.getAuthInstance();

    if(auth2.isSignedIn.get()) {
        onSignIn(auth2.currentUser.get())
    } else {
        $('alert-placeholder').html('<div id="cookiealert" class="alert alert-warning">' +
                                    '<span>Sign in with google to proceed.</span></div>')

        $('google-sign-in').html('<div class="g-signin2" data-onsuccess="onSignIn"></div>')
    }
}

function onSignIn(googleUser){
    //
}