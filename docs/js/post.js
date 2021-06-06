"use strict";

import { photosAPI } from "/js/api/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
 
const urlParams = new URLSearchParams(window.location.search);
const photoId = urlParams.get("photoId");
let currentPhoto = null;

function main() {
    let photoForm = document.getElementById("form-upload-photo");
    photoForm.onsubmit = handleFormSubmit;

    if(photoId !== null) {
        loadPhotoInfo();
    }
}

function loadPhotoInfo() {
    let titleInput = document.getElementById("input-title");
    let descriptionInput = document.getElementById("input-description");
    let urlInput = document.getElementById("input-url");
    let visibilityInput = document.getElementById("input-visibility");
    
    let pageTitle = document.getElementById("page-title");
    pageTitle.textContent = "Editing a photo";

    photosAPI.getById(photoId)
        .then(photo => {
            currentPhoto = photo;
            titleInput.value = currentPhoto.title;
            descriptionInput.value = currentPhoto.description;
            urlInput.value = currentPhoto.url;
            visibilityInput.value = currentPhoto.visibility;
        })
        .catch(err => messageRenderer.showErrorMessage(err))
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    let form = event.target;
    let formData = new FormData(form);

    let errors = []; //TODO hacer validacion con un validador

    if (errors.length > 0 ) {
        //TODO mostrar los errores
    }else {
        //Enviar el formulario
        if (photoId === null) {
            //Creando una foto
            formData.append("userId", sessionManager.getLoggedId());
            photosAPI.create(formData)
                .then(resp => window.location.href = "index.html")
                .catch(err => messageRenderer.showErrorMessage(err));
        } else {
            //Editando una foto
            formData.append("userId", currentPhoto.userId);
            photosAPI.update(photoId, formData)
                .then(resp => window.location.href = "photo_detail.html?photoId=" + photoId)
                .catch(err => messageRenderer.showErrorMessage(err))
        }
        
    }
}

document.addEventListener("DOMContentLoaded", main);