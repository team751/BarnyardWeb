// Client ID and API key from the Developer Console
     var CLIENT_ID = '637060621328-uc4ag2saftdl5vr82i2jjpk1l0tk76m4.apps.googleusercontent.com';
     var API_KEY = 'AIzaSyCYJJgN8jD23atGbEoMp22WQDG0w8NG5jM';

     // Array of API discovery doc URLs for APIs used by the quickstart
     var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

     // Authorization scopes required by the API; multiple scopes can be
     // included, separated by spaces.
     var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

     //Sheet id
     var ID = "1zRSYqFLEEHLTDiMwv_tjmZ2aUK3V4LZ9E4OVBDFX_OI";

     var authorizeButton = document.getElementById('authorize_button');
     var signoutButton = document.getElementById('signout_button');

     function handleClientLoad() {
       gapi.load('client:auth2', initClient);
     }

     function read(range = "Part Info!A3:A3"){
       gapi.client.sheets.spreadsheets.values.get({
         spreadsheetId: ID,
         range: "Part Info!A3:A3",
       }).then((response) => {
        var result = response.result;
        console.log(`Values retrieved.`);
      });
        console.log(result.values[0])
     }


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
       }, function(error) {
         appendPre(JSON.stringify(error, null, 2));
       });
     }
