const { loginRoute } = require("../api/loginAPI");

exports.apply = function(router) {
    router.post("/login", loginRoute);
};