const registrationRoute = require("./registrationRoute");
const applyRoutes = (router) => {
    // registrationRoute.userRegister;
    registrationRoute.apply(router);
    return router;
};

exports.applyRoutes = applyRoutes;