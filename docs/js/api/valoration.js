"use strict";

import { BASE_URL, requestOptions } from "/js/api/common.js";

const valorationAPI = {
    getById_valoration: function(photoId) {
        return new Promise(function(resolve, reject){
            axios.get(BASE_URL + "/valoration/" + photoId, requestOptions)
                .then(response => resolve(response.data[0]))
                .catch(err => reject(err.response.data.message));
        });
    },

    create_valoration: function(formData) {
        return new Promise(function(resolve, reject) {
            axios.post(BASE_URL + "/valoration", formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(err => reject(err.response.data.message));
        });
    },
}

export{ valorationAPI };