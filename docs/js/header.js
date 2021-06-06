"use strict";

import { sessionManager } from "/js/utils/session.js";

function main() {
    addLoggerUsername();
    addLogoutHandler();
    hideMenuElements();
}

function hideMenuElements() {
    let loginBtn = document.getElementById("header-login");
    let logoutBtn = document.getElementById("header-logout");
    let registerBtn = document.getElementById("header-register");
    let createPhotoBtn = document.getElementById("header-create-photo");

    if(sessionManager.isLogged()) {
        loginBtn.style.display = "none";
        registerBtn.style.display = "none";
    }else{
        logoutBtn.style.display = "none";
        createPhotoBtn.style.display = "none";
    }
}

function addLogoutHandler() {
    let logoutBtn = document.getElementById("header-logout");
    logoutBtn.onclick = function (event) {
        sessionManager.logout();
        window.location.href = "index.html";
    }
}

function addLoggerUsername() {
    let username;
    let headerTitle = document.getElementById("header-username");

    
    headerTitle.onclick = function(event) {
        let currentUserId = sessionManager.getLoggedId();
        window.location.href = "profile.html?userId=" + currentUserId;
    }
   

    if(sessionManager.isLogged()) {
        //Si sesión iniciada
        let userData = sessionManager.getLoggedUser();
        username = "@" + userData.username;
    }else{
        //Invitado
        username = "Guest";
    }

    headerTitle.textContent = username;

}

document.addEventListener("DOMContentLoaded", main);