"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { categoriesRenderer } from "/js/renderers/categories.js";

const galleryCategoriesRenderer = {
    asCategoryGallery: function (categories) {
        let html = `<div></div>`;
        let galleryCategories = parseHTML(html);

        for(let category of categories) {
            let card = categoriesRenderer.asNewCategory(category);
            galleryCategories.appendChild(card);
        }

        return galleryCategories;
    },
};

export { galleryCategoriesRenderer }