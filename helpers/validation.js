const { check } = require('express-validator');

const validation = {

	signUpValidation : function () {
		var validation = [
			check ('fName', 'First name should not be empty').notEmpty (),
			check ('lName', 'Last name should not be empty').notEmpty (),
			check ('username', 'Invalid username. Minimum of 12 characters and maximum of 20 characters.')
			.isLength ({min: 12, max: 20}),
			check ('password', 'Invalid password. Minimum of 12 characters and maximum of 20 characters.')
			.isLength ({min: 12, max: 20}).custom((value,{req, loc, path}) => {
            if (value !== req.body.c_Password) {
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        }),
			check ('school', 'University name should not be empty').notEmpty ()
		]

		return validation;
	}
}

module.exports = validation;