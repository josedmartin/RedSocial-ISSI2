"use strict";

import { usersAPI } from "/js/api/users.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { profileRenderer } from "/js/renderers/profile.js";
import { photosAPI } from "/js/api/photos.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { sessionManager } from "/js/utils/session.js";

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

function main() {  
    loadInfo();
    loadPhotos();
        
}

function addCardMouseHandler() {
    let cards = document.querySelectorAll("div.card");
    
    for (let card of cards) {
        card.onmouseenter = handleMouseEnterCard;
        card.onmouseleave = handleMouseLeaveCard;
    }

}

function handleMouseLeaveCard (event) {
    let targetCard = event.target;
    targetCard.style.backgroundColor = "#343F4B";
    targetCard.style.color = "white";
}

function handleMouseEnterCard (event) {
    let targetCard = event.target;
    targetCard.style.backgroundColor = "#EBEBEB";
    targetCard.style.color = "black";
}

function loadInfo() {
    let profileData = document.getElementById("profile-data");
    let currentUserId = userId;
    
    usersAPI.getById_users(currentUserId)
        .then(users =>{
            let data = profileRenderer.asProfile(users);
            profileData.appendChild(data);
        })
        .catch(err => messageRenderer.showErrorMessage(err));
    
}

function loadPhotos() {
    let galleryDiv = document.getElementById("profile-gallery");
    let currentUserId = sessionManager.getLoggedId();

    if (userId == currentUserId) {

        photosAPI.getAllPubPrivUserId(userId)
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryDiv.appendChild(gallery);
            addCardMouseHandler();
        })
        .catch(err => messageRenderer.showErrorMessage(err));

    } else {

        photosAPI.getAllUserId(userId)
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryDiv.appendChild(gallery);
            addCardMouseHandler();
        })
        .catch(err => messageRenderer.showErrorMessage(err));
    } 

}

document.addEventListener("DOMContentLoaded", main);