"use strict";

const userValidator = {
    validateRegister: function (formData) {

        let errors = [];

        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");
        let password1 = formData.get("password");
        let password2 = formData.get("password2");
    
        if(firstName.length < 3) {
            errors.push("The firstName must have more than 3 caracters");
            //window.alert("The firstName must have more than 3 caracters");
        }
    
        if(lastName.length < 3) {
            errors.push("The lastName must have more than 3 caracters");
            //window.alert("The lastName must have more than 3 caracters");
        }
        
        if (password1 !== password2) {
            errors.push("The two passwords must match");
            //window.alert("The two passwords must match");
        }

    return errors;

    },

    validateLogin: function (formData) {
        let errors = [];

        let username = formData.get("username");
        if(username.length < 3 ) {
            errors.push("The username must have more than 2 caracters");
        }

        return errors;
    }
};

export { userValidator };
