function checkLogin() {
    console.log("login loaded")

    if(!navigator.cookieEnabled) {
        $('alert-placeholder').html('<div id="cookiealert" class="alert alert-warning">' +
                                    '<span>Cookies aren\'t enabled! Please enable them to use '+
                                    'Barnyard-Web</span></div>')
        return
    }

    const auth2 = gapi.auth2.getAuthInstance();
    const div = document.createElement("div")

    console.log("checking login")

    auth2.currentUser.listen(function (googleUser) {
        if(googleUser.isSignedIn()) {
            const alertContent = document.getElementById("alert-content")
            const basicProfile = googleUser.getBasicProfile()
            const logInAlert = document.createElement("div")

            console.log("User is: ", googleUser)

            document.body.removeChild(document.getElementById("g-signin-button"))

            while(alertContent.firstChild) {
                alertContent.removeChild(alertContent.firstChild)
            }

            logInAlert.className = "row"
            logInAlert.innerHTML = `
            <div class="alert alert-success" role="alert">
                <img src=` + basicProfile.getImageUrl() + ` alt="User">
                <h3 class="alert-heading">Hello 👋` + basicProfile.getName() + `</h3>
            </div>
            `

            alertContent.appendChild(logInAlert)
        }
    })

    div.className = "row"
    div.innerHTML = `
    <div class="alert alert-warning" role="alert">
        <span>Sign in with google to proceed.</span>
    </div>
    `

    console.log("sign in needed")

    document.getElementById("alert-content").appendChild(div)
}