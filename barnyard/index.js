function checkLogin() {
    console.log("login loaded")

    if(!navigator.cookieEnabled) {
        $('alert-placeholder').html('<div id="cookiealert" class="alert alert-warning">' +
                                    '<span>Cookies aren\'t enabled! Please enable them to use '+
                                    'Barnyard-Web</span></div>')
        return
    }

    const auth2 = gapi.auth2.getAuthInstance();

    console.log("checking login")

    if(auth2.isSignedIn.get()) {
        console.log("already logged in")

        onSignIn(auth2.currentUser.get())
    } else {
        const div = document.createElement("div")

        div.className = "row"
        div.innerHTML = `
        <div id="loginalert" class="alert alert-warning" role="alert">
            <span>Sign in with google to proceed.</span>
        </div>
        `

        console.log("sign in needed")

        document.body.appendChild(div)
    }
}

function onSignIn(googleUser){
    //
}