"use strict";

import { BASE_URL, requestOptions } from "/js/api/common.js";

const commentsAPI = {

    getAll: function () {
        return new Promise(function(resolve, reject) {
            axios.get(BASE_URL + "/comments", requestOptions)
                .then(response => resolve(response.data))
                .catch(err => reject(err.response.data.message));
        });
    },

    getAllCommentsById: function(photoId) {
        return new Promise(function(resolve, reject){
            axios.get(BASE_URL + "/comments/" + photoId + "/comments", requestOptions)
                .then(response => resolve(response.data))
                .catch(err => reject(err.response.data.message));
        });
    },

    createComments: function(formData) {
        return new Promise(function(resolve, reject) {
            axios.post(BASE_URL + "/comments", formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(err => reject(err.response.data.message));
        });
    },
};

export { commentsAPI };