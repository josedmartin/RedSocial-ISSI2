"use strict";

import { messageRenderer } from "/js/renderers/messages.js";
import { userValidator } from "/js/validators/users.js";
import { authAPI } from "/js/api/auth.js";
import { sessionManager } from "/js/utils/session.js";

function main() {
    addRegisterSubmitHandler();
}

function addRegisterSubmitHandler() {
    let form = document.getElementById("register-form");
    form.onsubmit = registerSubmit;
}

function registerSubmit(event) {
    event.preventDefault();

    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";

    let form = event.target;
    let formData = new FormData(form);

    let errors = userValidator.validateRegister(formData);
    
    if(errors.length > 0) {
        for(let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    }else {
        //Enviamos el formulario
        authAPI.register(formData)
            .then(resp => {
                let token = resp.sessionToken;
                let userData = resp.user;
                sessionManager.login(token, userData);
                window.location.href = "index.html";
            })
            .catch(err => messageRenderer.showErrorMessage(err));
    }
}

document.addEventListener("DOMContentLoaded", main);