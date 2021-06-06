"use strict";

import {parseHTML} from "/js/utils/parseHTML.js";

const commentsRenderer = {
    asNewComment: function (comment) {
        let html = `<p style="font-size:13px; margin-left: 5px;"><b>@${comment.username}:</b> ${comment.commentText}</p>`;
    let commmentsData = parseHTML(html);
    return commmentsData;
    },

}

export {commentsRenderer};