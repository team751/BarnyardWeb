function checkLogin() {
    if(!navigator.cookieEnabled) {
        $('alert-placeholder').html('<div id="cookiealert" class="alert alert-warning">' +
                                    '<span>Cookies aren\'t enabled! Please enable them to use '+
                                    'Barnyard-Web</span></div>')
    }


}