"use strict";

import { authAPI } from "/js/api/auth.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { userValidator } from "/js/validators/users.js";

function main() {  
    let loginForm = document.getElementById("login-form");
    loginForm.onsubmit = handleLoginSubmit;
}

function handleLoginSubmit(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";

    let errors = userValidator.validateLogin(formData);

    if(errors.length > 0) {
        for(let error of errors) {
            messageRenderer.showErrorMessage(error);
        
        }

    }else {
        authAPI.login(formData)
            .then(resp => {
                let token = resp.sessionToken;
                let userData = resp.user;
                sessionManager.login(token, userData);
                window.location.href = "index.html";
            })
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}

document.addEventListener("DOMContentLoaded", main);