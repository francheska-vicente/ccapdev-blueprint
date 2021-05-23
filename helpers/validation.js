const { check } = require('express-validator');

const validation = {

	signUpValidation : function () {
		var validation = [
			check ('fName', 'First name should not be empty').notEmpty ().custom((value,{req, loc, path}) => {
			value = value.split ("-").join ("").split ("_").join ("").split (".").join ("").split ("ñ").join ("").split (" ").join ("");
            if (!value.match (/^[a-z]+$/i)) {
            	console.log (value);
                throw new Error("Invalid first name. Use valid characters only.");
            } else {
                return value;
            }
        }),
			check ('lName', 'Last name should not be empty').notEmpty ().custom((value,{req, loc, path}) => {
			value = value.split ("-").join ("").split ("_").join ("").split (".").join ("").split ("ñ").join ("").split (" ").join ("");
            if (!value.match (/^[a-z]+$/i)) {
            	console.log (value);
                throw new Error("Invalid last name. Use valid characters only.");
            } else {
                return value;
            }
        }),
			check ('username', 'Invalid username. Minimum of 12 characters and maximum of 20 characters.')
			.isLength ({min: 12, max: 20}).custom((value,{req, loc, path}) => {
			value = value.split ("-").join ("").split ("_").join ("").split (".").join ("");
            if (!value.match (/^[a-z0-9]+$/i)) {
                throw new Error("Invalid username. Use valid characters only.");
            } else {
                return value;
            }
        }),
			check ('password', 'Invalid password. Minimum of 12 characters and maximum of 20 characters.')
			.isLength ({min: 12, max: 20}).custom((value,{req, loc, path}) => {
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
	},

    editProfile : function () {

        var validation = [
            check ('username', 'Invalid username. Minimum of 12 characters and maximum of 20 characters.')
                .isLength ({min: 12, max: 20}).custom((value,{req, loc, path}) => {
                value = value.split ("-").join ("").split ("_").join ("").split (".").join ("");
                if (!value.match (/^[a-z0-9]+$/i)) {
                    console.log (value);
                    throw new Error("Invalid username. Use valid characters only.");
                } else {
                    return value;
                }
            }),
            check ('contact_no').optional ({nullable: true, checkFalsy: true})
            .custom((value,{req, loc, path}) => {
                var temp = parseInt (value);
                if (!Number.isInteger (temp)) {
                    throw new Error("Invalid contact number. Use numbers only.");
                } else {
                    return value;
                }
            }),
            check ('degree').optional ({nullable: true, checkFalsy: true})
            .custom((value,{req, loc, path}) => {
                value = value.split (" ").join ("");
                if (!value.match (/^[a-z]+$/i)) {
                    throw new Error("Invalid degree. Use letters only.");
                } else {
                    return value;
                }
            }),
            check ('bio', 'Invalid bio. Maximum of 100 characters.').isLength ({min: 0, max: 100}),
            check ('n_password').optional ({nullable: true, checkFalsy: true})
            .custom((value,{req, loc, path}) => {
                if (!(value.length == 0 || (value.length >= 12 && value.length <= 20))) {
                    throw new Error("Invalid password. Minimum of 12 characters and maximum of 20 characters.");
                } else {
                    return value;
                }
            }),
            check ("password", "Please enter your password to edit your profile").notEmpty ()
        ]

        return validation;
    },

    addClass : function () {

        var temp = false;

        var validation = [
            check ('classname', 'Required fields must be filled.').notEmpty ().custom((value,{req, loc, path}) => {
                value = value.split ("-").join ("").split ("_").join ("").split (".").join ("").split ("ñ").join ("").split (" ").join ("");
                if (!value.match (/^[a-z0-9]+$/i) && value != "") {
                    console.log (value);
                    throw new Error("Invalid input. Use valid characters only.");
                } else {
                    return value;
                }
            }),
            check ('coursecode', 'Required fields must be filled.').notEmpty ().custom((value,{req, loc, path}) => {
                value = value.split ("-").join ("").split ("_").join ("").split (".").join ("").split ("ñ").join ("").split (" ").join ("");
                if (!value.match (/^[a-z0-9]+$/i) && value != "") {
                    console.log (value);
                    throw new Error("Invalid input. Use valid characters only.");
                } else {
                    return value;
                }
            }),
            check ('professor', 'Required fields must be filled.').notEmpty ().custom((value,{req, loc, path}) => {
                value = value.split ("-").join ("").split ("_").join ("").split (".").join ("").split ("ñ").join ("").split (" ").join ("");
                if (!value.match (/^[a-z]+$/i) && value != "") {
                    console.log (value);
                    throw new Error("Invalid input. Use valid characters only.");
                } else {
                    return value;
                }
            }),
            check ('classdayA', 'Required fields must be filled.').notEmpty (),
            check ('start_classtimeA', 'Required fields must be filled.').notEmpty (),
            check ('end_classtimeA', 'Required fields must be filled.').notEmpty (),
            check ('classdayB').optional ({nullable: true, checkFalsy: true})
            .custom((value,{req, loc, path}) => {
                if (value != null)
                    temp = true;
                return value;
            }),
            check ('start_classtimeB').optional ({nullable: true, checkFalsy: true})
            .custom((value, {req, loc, path}) => {
                if (temp && value == null) {
                    throw new Error("Required fields must be filled.");
                } else {
                    return value;
                }
            }),
            check ('end_classtimeB').optional ({nullable: true, checkFalsy: true})
            .custom((value, {req, loc, path}) => {
                if (temp && value == null) {
                    throw new Error("Required fields must be filled.");
                } else {
                    return value;
                }
            }),
        ]

        return validation;
    }
}

module.exports = validation;