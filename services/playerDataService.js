"use strict";
const { status } = require("express/lib/response");
const dbUtils_1 = require("../db/dbUtils");
var bcrypt = require('bcrypt');

exports.playerDataService = {
    setPlayerData: async function (request,res) {
        // Get user data
        var userData = {
            'token': request.body.token,
            'data': request.body.data
        };
        var dataAddedResult;
        let statusCode = 400, message = "Please login first to set player data!";
        const isTokenValid = await dbUtils_1.dbOperations.findOne("Sessions", {'token': userData.token});
        if(isTokenValid)
        {
            // Indicates a valid session
            // Store the user's data into a table, or if it exists already, update it
            const isDataPresent = await dbUtils_1.dbOperations.findOne("PlayerData", {'username': isTokenValid.username});
            if(isDataPresent)
            {
                // Update the data
                dataAddedResult = await dbUtils_1.dbOperations.update("PlayerData", {'username' : isTokenValid.username}, {$set: {'data': userData.data}});
                if(dataAddedResult)
                {
                    // Success
                    statusCode = 201;
                    message = "Player data updated successfully!";
                }
            }
            else
            {
                // Add new data
                dataAddedResult = await dbUtils_1.dbOperations.insertOne("PlayerData", {'username': isTokenValid.username, 'data': userData.data});
                if(dataAddedResult != null)
                {
                    // Indicates success
                    statusCode = 201;
                    message = "Player data added successfully!";
                }
            }
        }
        
        return {'statusCode': statusCode, 'message': message};
        
    }
}