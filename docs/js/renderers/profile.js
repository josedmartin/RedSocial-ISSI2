"use strict";

import {parseHTML} from "/js/utils/parseHTML.js";

const profileRenderer = {
    asProfile: function (user) {
        let html = `<div class="row container-profile">
        <div class="col" style="text-align:center;">
            <img class="avatar-profile" src="${user.avatarUrl}">
            <hr style="border:0px;">
            <h5> @${user.username}</h5>
            <p style="color: #47525E;">${user.firstName} ${user.lastName} </p>
            <p style="color: #47525E; margin-top:-20px">${user.email}</p>
        </div>
    </div>`;
    let profileData = parseHTML(html);
    return profileData;
    },

}

export {profileRenderer};