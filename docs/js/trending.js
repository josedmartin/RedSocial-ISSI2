"use strict";

import { photosAPI } from "/js/api/photos.js"; 
import { messageRenderer } from "/js/renderers/messages.js";
import { galleryRenderer } from "/js/renderers/gallery_trending.js";

function main() {  
    loadGallery();
    
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


function loadGallery() {
    let galleryDiv = document.getElementById("gallery-trending");

    photosAPI.getAll()
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryDiv.appendChild(gallery);
            addCardMouseHandler();
        })
        .catch(err => messageRenderer.showErrorMessage(err));

}

document.addEventListener("DOMContentLoaded", main);