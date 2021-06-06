"use strict";

import { photosAPI } from "/js/api/photos.js";
import { valorationAPI } from "/js/api/valoration.js";
import { commentsAPI } from "/js/api/comments.js";
import { photoRenderer } from "/js/renderers/photos.js";
import { galleryCommentsRenderer } from "/js/renderers/galleryComments.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
 
const urlParams = new URLSearchParams(window.location.search);
const photoId = urlParams.get("photoId");

function main() {  
    loadPhotoDetails();
    loadCommentsDetails();
    hideActionsColumn();

    let deleteBtn = document.getElementById("delete-photo-button");
    deleteBtn.onclick = handleDeleteButton;

    let editBtn = document.getElementById("edit-photo-button");
    editBtn.onclick = handleEditButton;

    let scoreForm = document.getElementById("score-form");
    scoreForm.onsubmit = updateScore;

    let commentsForm = document.getElementById("comments-form");
    commentsForm.onsubmit = createComment;
}


function loadCommentsDetails(){
    let boxComments = document.getElementById("box-comments");

    commentsAPI.getAllCommentsById(photoId)
        .then(comments => {
            let gallery = galleryCommentsRenderer.asCommentsGallery(comments);
            boxComments.appendChild(gallery);

        })
        .catch(err => messageRenderer.showErrorMessage(err));
}

function createComment(event) {
    event.preventDefault();
    
    let form = event.target;
    let formData = new FormData(form);

    formData.append("userId", sessionManager.getLoggedId());
    formData.append("photoId", urlParams.get("photoId"));

    commentsAPI.createComments(formData)
        .then(resp => window.location.href = "photo_detail.html?photoId=" + photoId)
        .catch(err => messageRenderer.showErrorMessage(err));
}

function updateScore(event) {
    event.preventDefault();
    
    let form = event.target;
    let formData = new FormData(form);

    let puntuacion = document.getElementById("select-stars").value;
    
    formData.set("value", puntuacion);
    formData.append("userId", sessionManager.getLoggedId());
    formData.append("photoId", urlParams.get("photoId"));
    
    valorationAPI.create_valoration(formData)
        .then(resp => window.location.href = "photo_detail.html?photoId=" + photoId)
        .catch(err => messageRenderer.showErrorMessage(err));
}

function hideActionsColumn() {
    if(!sessionManager.isLogged()) {
        let actionsColumn = document.getElementById("actions-column");
        actionsColumn.style.display = "none"
    }
}

function handleDeleteButton(event) {
    let answer = confirm("Are you sure you want to delete this post?");

    if(answer) {
        photosAPI.delete(photoId)
            .then(resp => window.location.href = "index.html")
            .catch(err => messageRenderer.showErrorMessage(err));
    }
}

function handleEditButton(event) {
    window.location.href = "post.html?photoId=" + photoId;
}

function loadPhotoDetails() {
    photosAPI
        .getById(photoId)
        .then(photo => {
            let detailColumn = document.getElementById("photo-detail");
            let photoDetail = photoRenderer.asDetails(photo);
            detailColumn.appendChild(photoDetail);
        })
        .catch(err => messageRenderer.showErrorMessage(err));
}

document.addEventListener("DOMContentLoaded", main);