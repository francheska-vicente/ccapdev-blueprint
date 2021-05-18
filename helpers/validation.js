const { check } = require('express-validator');

const validation = {

	signUpValidation : function () {

		
		var validation = [
			check ('fName', 'First name should not be empty').notEmpty ().custom((value,{req, loc, path}) => {
			value = value.replaceAll("-", '').replaceAll("_", '').replaceAll(".", '').replaceAll("ñ", '').replaceAll(" ", '');
            if (!value.match (/^[a-z]+$/i)) {
            	console.log (value);
                throw new Error("Invalid first name. Use valid characters only.");
            } else {
                return value;
            }
        }),
			check ('lName', 'Last name should not be empty').notEmpty ().custom((value,{req, loc, path}) => {
			value = value.replaceAll("-", '').replaceAll("_", '').replaceAll(".", '').replaceAll("ñ", '').replaceAll(" ", '');
            if (!value.match (/^[a-z]+$/i)) {
            	console.log (value);
                throw new Error("Invalid last name. Use valid characters only.");
            } else {
                return value;
            }
        }),
			check ('username', 'Invalid username. Minimum of 12 characters and maximum of 20 characters.')
			.isLength ({min: 12, max: 20}).custom((value,{req, loc, path}) => {
			value = value.replaceAll("-", '').replaceAll("_", '').replaceAll(".", '');
            if (!value.match (/^[a-z0-9]+$/i)) {
            	console.log (value);
                throw new Error("Invalid username. Use valid characters only.");
            } else {
                return value;
            }
        }),
			check ('password', 'Invalid password. Minimum of 12 characters and maximum of 20 characters.')
			.isLength ({min: 12, max: 20}).custom((value,{req, loc, path}) => {
			console.log (value + " " + req.body.c_password);
            if (value !== req.body.c_password) {
                throw new Error("Passwords don't match.");
            } else {
                return value;
            }
        }),
			check ('email', 'Invalid email.').isEmail (),
			check ('school', 'University name should not be empty').notEmpty ()
		]

		return validation;
	}
}

module.exports = validation;