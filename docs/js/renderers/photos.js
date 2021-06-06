"use strict";

import {parseHTML} from "/js/utils/parseHTML.js";

const photoRenderer = {
    asCard: function (photo) {
        let html = `<div class="col-md-4">
        <div id="photo-card" class="card text-center">
            <a style="text-decoration: none; color: black;" href="profile.html?userId=${photo.userId}">
                <h6 style="text-align: left; color:white;"> <img class="profile-icon" src="${photo.avatarUrl}" alt="login"> @${photo.username}</h6>
            </a>
            <a href="photo_detail.html?photoId=${photo.photoId}"><img class="card-img-top imagenes-posts" src="${photo.url}" alt="${photo.title}"></a>
            <div class="card-body">
            <h5 class="card-title">${photo.title}</h5>
            <p class="card-text">${photo.description}</p>
            <a href="photo_detail.html?photoId=${photo.photoId}"</a>
         </div>
        </div>
    </div>`;
    let card = parseHTML(html);
    return card;
    },

    asDetails: function (photo) {
        let html = `<div>
        <h2>${photo.title}</h2>
        <h4>${photo.description}</h4>
        <p>Uploaded by <a href="profile.html?userId=${photo.userId}">@${photo.username}</a> on ${photo.date}</p>
        <p>Score:${photo.score}</p>

        <hr>
        <img src="${photo.url}" class="img-fluid" alt="${photo.description}">
        </div>`
        let details = parseHTML(html);
        return details;
    }
};

export {photoRenderer};