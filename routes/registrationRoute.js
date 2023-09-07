const { registerRoute } = require("../api/registrationAPI");

// exports.userRegister = void 0;


// const userRegister = (router) => {
//     router.post("/registration", registrationAPI_1.registrationAPI_2.invoke);
// };
// exports.userRegister = userRegister;
exports.apply = function(router) {
    router.post("/registration", registerRoute);
};