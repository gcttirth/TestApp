
//const { response } = require("../app");
const loginService1 = require("../services/loginService");
const ERROR_USER_ALREADY_LOGGED_IN = 409;
exports.loginRoute = async function(req, res){
    console.log(req.body);
    const data = await loginService1.loginService.loginAccount(req,res);
    console.log("user login result = " + data);
    res.status(data.statusCode).json({'data': data});
}