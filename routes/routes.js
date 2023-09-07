const registrationRoute = require("./registrationRoute");
const loginRoute = require("./loginRoute");
const applyRoutes = (router) => {
    // registrationRoute.userRegister;
    registrationRoute.apply(router);
    loginRoute.apply(router);
    return router;
};

exports.applyRoutes = applyRoutes;