"use strict";
const dbUtils_1 = require("../db/dbUtils");
var bcrypt = require('bcrypt');

exports.loginService = {
    loginAccount: async function (request,res) {
        // Get user data
        var userData = {
            'username': request.body.username,
            'password': request.body.password
        };
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(userData.password, salt);
        console.log("Hash = " + hash);

        // Verify data (username doesn't exist, password strength, etc)
        const isUsernameInvalid = await dbUtils_1.dbOperations.findOne("Accounts", {'username': userData.username});
        // If verified, add user data to database
        if(isUsernameInvalid) {
            // Indicates that the username is present
            // If user is not logged in, check if password is correct
            const isPasswordValid = bcrypt.compareSync(userData.password, isUsernameInvalid.password);
            if(isPasswordValid)
            {
                // Check if user is already logged in
                const isUserLoggedIn = await dbUtils_1.dbOperations.findOne("Sessions", {'username': userData.username});
                if(isUserLoggedIn)
                {
                    // Indicates that the user is already logged in (has an active session)
                    return {'statusCode': 409, 'message': "User is already logged in!"};
                }
                // Generate access token, add it to database session table, and pass it to user
                console.log("Username and password are valid!");
                const userString = userData.username + "ApplicationName" + Date.now;
                const userToken = (await bcrypt.hash(userString, salt)).toString();
                const newUserLogin = await dbUtils_1.dbOperations.insertOne("Sessions", {'username': userData.username, 'token': userToken, 'created': Date.now});
                console.log("is user logged in = " + newUserLogin);
                return {'statusCode': 201, 'data': newUserLogin, 'message': "Username login success!"};
            }
            else
            {
                return {'statusCode': 400, 'message': "Password is invalid"};
            }

        } else {
            // Indicates that the username is not found (new user) - ask the user to register or forget username/password
            return {'statusCode': 404, 'message': "Username not found, register new user or recover username/password"};
            
        }
        return {'statusCode': 400, 'message': "Bad request"};
    }
}