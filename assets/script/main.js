import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
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

// Configring Forms 

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

const userDetails = (name, email, password) => {
    let userNameDom = document.getElementById("user-name")
    let userEmailDom = document.getElementById("user-email")
    let userPasswordDom = document.getElementById("user-password");

    userNameDom.innerText = name;
    userEmailDom.innerText = email;
    userPasswordDom.innerText = password;
}

// Getting Forms from Dom 
const mainContainer = document.getElementById("main-container");
const signUpform = document.getElementById("sign-up-form");
const signInform = document.getElementById("sign-in-form");
const preLoadTextState = document.getElementById("text-state");
const preLoader = document.getElementById("pre-load-state");
const userDetailsContainer = document.getElementById("user-details-cont");

const errorHandler = (errorState) => {
    const errorHandlerDom = document.getElementById("error-unveiler");
    let errorStateText = document.getElementById("error-text");
    errorStateText.innerText = errorState;
    errorHandlerDom.style.display = "flex"
    const reloader = document.getElementById("reloader").addEventListener("click", () => {
        location.reload();
    })
};

// Signing Up User 
signUpform.addEventListener("submit", (evt) => {
    userName = document.getElementById("fulltName").value;
    userEmail = document.getElementById("sign-up-email").value;
    userPassword = document.getElementById("sign-up-password").value;

    if (userName === "" || userEmail === "" || userPassword === "") {
        alert("Please enter valid credential ");
        return;
    }
    userDetails(userName, userEmail, userPassword);
    // User Creation Function 
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            preLoadTextState.innerText = `Signed Up Successfully`;
            preLoader.style.display = "flex";
            mainContainer.style.display = "none";
            setTimeout(_ => {
                preLoader.style.display = "none";
                userDetailsContainer.style.display = "flex";
            }, 2000);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            errorHandler(errorCode);
        });

    evt.preventDefault();
})


// Signing in User 
signInform.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let userSignInName = document.getElementById("sign-in-name").value;
    let userSignInEmail = document.getElementById("sign-in-email").value;
    let userSignInPassword = document.getElementById("sign-in-password").value;
    if (userSignInEmail === "" || userSignInPassword === "") {
        alert("Invalid email or password");
        return;
    }

    userDetails(userSignInName, userSignInEmail, userSignInPassword);
    signInWithEmailAndPassword(auth, userSignInEmail, userSignInPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            preLoadTextState.innerText = `Signed In Successfully`;
            preLoader.style.display = "flex";
            mainContainer.style.display = "none";
            setTimeout(() => {
                preLoader.style.display = "none";
                userDetailsContainer.style.display = "flex";
            }, 2000);

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            errorHandler(errorCode);
            console.log(errorCode);
        });

})

// Sign Out 

document.getElementById("sign-out-btn").addEventListener("click", () => {
    if (auth) {
        signOut(auth).then(() => {
            preLoadTextState.innerText = `Signed Out Successfully`;
            preLoader.style.display = "flex"
            setTimeout(() => {
                preLoader.style.display = "none"
                location.reload();
            },2000);

        }).catch((error) => {
            const errorCode = error.code;
            errorHandler(errorCode);
            console.log(error);
        });
    } else {
        console.log("No Auth");
    }
})