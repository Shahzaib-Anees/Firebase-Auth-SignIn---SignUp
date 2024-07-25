import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBlSHIONgFGU5dFYFUnRmVBSzF-1biYhfc",
    authDomain: "shazzy-s-project.firebaseapp.com",
    projectId: "shazzy-s-project",
    storageBucket: "shazzy-s-project.appspot.com",
    messagingSenderId: "772033817507",
    appId: "1:772033817507:web:45ff1506636f8507d24816",
    measurementId: "G-L1MXPSQ69L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

let userName;
let userEmail;
let userPassword;

const signUpPath = document.getElementById('path-sign-up');
const signInPath = document.getElementById("path-sign-in");

const signUpFormCont = document.getElementById("sign-up-cont");
const signInFormCont = document.getElementById("sign-in-cont");

signUpPath.addEventListener("click", () => {
    signInFormCont.style.display = "none";
    signUpFormCont.style.display = "flex";
})
signInPath.addEventListener("click", () => {
    signUpFormCont.style.display = "none";
    signInFormCont.style.display = "flex";
})

// Getting Forms from Dom 
const signUpform = document.getElementById("sign-up-form");
const signInform = document.getElementById("sign-in-form");
const preLoadTextState = document.getElementById("text-state");
const preLoader = document.getElementById("pre-load-state");

// Signing Up User 
signUpform.addEventListener("submit", (evt) => {
    userName = document.getElementById("fulltName").value;
    userEmail = document.getElementById("sign-up-email").value;
    userPassword = document.getElementById("sign-up-password").value;

    if (userName === "" || userEmail === "" || userPassword === "") {
        alert("Please enter valid credential ");
        return;
    }

    // User Creation Function 
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            preLoadTextState.innerText = `Signed Up Successfully`;
            preLoader.style.display = "flex";
            setTimeout(_ => {
                preLoader.style.display = "none"
            }, 2000);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
            console.log(errorMessage);
        });

    evt.preventDefault();
})


// Signing in User 
signInform.addEventListener("submit", (evt) => {
    let userSignInEmail = document.getElementById("sign-in-email").value;
    let userSignInPassword = document.getElementById("sign-in-password").value;
    if (userSignInEmail === "" || userSignInPassword === "") {
        alert("Invalid email or password");
        return;
    }

    signInWithEmailAndPassword(auth, userSignInEmail, userSignInPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            preLoadTextState.innerText=`Signed In Successfully`;
            preLoader.style.display="flex";
            setTimeout(()=>{
                preLoader.style.display = "none";
            },2000);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });

    evt.preventDefault();
})