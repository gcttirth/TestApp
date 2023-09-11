const registrationRoute = require("./registrationRoute");
const loginRoute = require("./loginRoute");
const playerDataRoute = require("./playerDataRoute");
const applyRoutes = (router) => {
    // registrationRoute.userRegister;
    registrationRoute.apply(router);
    loginRoute.apply(router);
    playerDataRoute.apply(router);
    return router;
};

exports.applyRoutes = applyRoutes;