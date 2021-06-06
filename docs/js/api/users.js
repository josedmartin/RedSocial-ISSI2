"use strict";

import { BASE_URL, requestOptions } from "/js/api/common.js";

const usersAPI = {

    getAll_users: function () {
        return new Promise(function(resolve, reject) {
            axios.get(BASE_URL + "/users", requestOptions)
                .then(response => resolve(response.data))
                .catch(err => reject(err.response.data.message));
        });
    },

    getById_users: function(userId) {
        return new Promise(function(resolve, reject){
            axios.get(BASE_URL + "/users/" + userId, requestOptions)
                .then(response => resolve(response.data[0]))
                .catch(err => reject(err.response.data.message));
        });
    },

}

export { usersAPI };