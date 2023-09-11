
//const { response } = require("../app");
const playerDataService1 = require("../services/playerDataService");
const ERROR_USER_ALREADY_LOGGED_IN = 409;
exports.playerDataRoute = async function(req, res){
    console.log(req.body);
    const data = await playerDataService1.playerDataService.setPlayerData(req,res);
    console.log("user playerData result = " + data.statusCode);
    res.status(data.statusCode).json({'data': data});
}