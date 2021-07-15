import 'regenerator-runtime/runtime'

import { initContract, login, logout, isAccountTaken } from './utils'
import { generateSeedPhrase } from 'near-seed-phrase'
import * as nearAPI from "near-api-js"

var firebaseConfig = {
    apiKey: "AIzaSyCqTvR0ObQaA7Gq1v8KBPJkWS3Bg3-2QOw",
    authDomain: "claim-twitter-near.firebaseapp.com",
    projectId: "claim-twitter-near",
    storageBucket: "claim-twitter-near.appspot.com",
    messagingSenderId: "394388647188",
    appId: "1:394388647188:web:c85213affbef79e6e72601",
    measurementId: "G-NMG80D2NB0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

document.querySelector('#make-twitter-auth').onclick = signin;

/*function signin() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params);
    return params;
}*/

function signin() {
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log("Doing great keep going");
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            var token = credential.accessToken;
            var secret = credential.secret;

            // The signed-in user info.
            var user = result.user;
            // ...
            console.log("----- RESULT-----");
            console.log(result.additionalUserInfo.username);
            console.log("----- USER -----");
            /*console.log(user);
            console.log("----- Additional Info? -----");
            console.log(credential);
            console.log("----- USER INFO -----");
            console.log(user.uid);
            console.log(user.displayName);
            console.log(user.photoURL);*/

            document.querySelector('#twitter-login').style.display = 'none';
            document.querySelector('#claiming-form').style.display = 'block';
            document.querySelector('#loged-message').style.display = 'block';
            document.querySelector('#loged-message').innerHTML = "Wellcome <br>@" + result.additionalUserInfo.username;
            document.querySelector('#username').value = result.additionalUserInfo.username;

            /*const urlSearchParams = new URLSearchParams(window.location.search);
            urlSearchParams.append('account_id', result.additionalUserInfo.username);
            const params = Object.fromEntries(urlSearchParams.entries());
            console.log('params');
            console.log(params);*/

            /*document.querySelector('#name').innerHTML = user.displayName;
            document.querySelector('#username').innerHTML = "@" + result.additionalUserInfo.username;
            image = document.querySelector('#image');
            image.src = "https://pbs.twimg.com/profile_images/1350519257172488192/AgDmYNsJ_normal.jpg";*/

        }).catch((error) => {
            console.log("There was an error in the twitter auth");
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error code: " + error.code + " with message: " + error.message);
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
}
function signout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        messenger = document.getElementById('messenger');
        messenger.textContent = "You made Logout";
    }).catch((error) => {
        messenger = document.getElementById('messenger');
        messenger.textContent = "There was an error while login out";
    });
}