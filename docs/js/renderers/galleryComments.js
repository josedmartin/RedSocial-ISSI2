"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { commentsRenderer } from "/js/renderers/comments.js";

const galleryCommentsRenderer = {
    asCommentsGallery: function (comments) {
        let html = `<div class="box-comments overflow-auto"></div>`;
        let galleryComments = parseHTML(html);

        for(let comment of comments) {
            let card = commentsRenderer.asNewComment(comment);
            galleryComments.appendChild(card);
        }

        return galleryComments;
    },
};

export { galleryCommentsRenderer }