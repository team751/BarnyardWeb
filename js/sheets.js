// Client ID and API key from the Developer Console
     var CLIENT_ID = '<YOUR_CLIENT_ID>';
     var API_KEY = '<YOUR_API_KEY>';

     // Array of API discovery doc URLs for APIs used by the quickstart
     var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

     // Authorization scopes required by the API; multiple scopes can be
     // included, separated by spaces.
     var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

     var authorizeButton = document.getElementById('authorize_button');
     var signoutButton = document.getElementById('signout_button');

     /**
      *  On load, called to load the auth2 library and API client library.
      */
     function handleClientLoad() {
       gapi.load('client:auth2', initClient);
     }

     /**
      *  Initializes the API client library and sets up sign-in state
      *  listeners.
      */
     function initClient() {
       gapi.client.init({
         apiKey: API_KEY,
         clientId: CLIENT_ID,
         discoveryDocs: DISCOVERY_DOCS,
         scope: SCOPES
       }).then(function () {
         // Listen for sign-in state changes.
         gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

         // Handle the initial sign-in state.
         updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
         authorizeButton.onclick = handleAuthClick;
         signoutButton.onclick = handleSignoutClick;
       }, function(error) {
         appendPre(JSON.stringify(error, null, 2));
       });
     }

     
