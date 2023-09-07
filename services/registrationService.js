"use strict";
const dbUtils_1 = require("../db/dbUtils");

exports.registrationService = {
    createAccount: async function (request) {
        // Get user data
        var userData = {
            'username': request.body.username,
            'password': request.body.password
        };
        // Verify data (username doesn't exist, password strength, etc)
        const isUsernameInvalid = await dbUtils_1.dbOperations.findOne("testing", {'username': userData.username});
        // If verified, add user data to database
        if(isUsernameInvalid) {
            // Indicates that the username is present, return error (or ask for login instead)
        } else {
            // Indicates that the username is not found (new user) - add the data in
            const userDataAdded = await dbUtils_1.dbOperations.insertOne("testing", {'username': userData.username, 'password': userData.password});
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