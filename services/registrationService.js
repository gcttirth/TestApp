"use strict";
const dbUtils_1 = require("../db/dbUtils");
var bcrypt = require('bcrypt');

exports.registrationService = {
    createAccount: async function (request) {
        // Get user data
        var userData = {
            'username': request.body.username,
            'password': request.body.password
        };
        console.log("body = " + request.body.username);
        console.log("username = " + userData.username);
        console.log("pw = " + userData.password);
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(userData.password, salt);
        console.log("Hash = " + hash);

        // Verify data (username doesn't exist, password strength, etc)
        const isUsernameInvalid = await dbUtils_1.dbOperations.findOne("Accounts", {'username': userData.username});
        // If verified, add user data to database
        if(isUsernameInvalid) {
            // Indicates that the username is present, return error (or ask for login instead)
        } else {
            // Indicates that the username is not found (new user) - add the data in
            const userDataAdded = await dbUtils_1.dbOperations.insertOne("Accounts", {'username': userData.username, 'password': hash});
            if(userDataAdded)
            {
                return userDataAdded;
            } else {
                return null;
            }
        }
        return null;
    }
}