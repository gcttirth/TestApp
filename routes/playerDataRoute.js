const { playerDataRoute } = require("../api/playerDataAPI");

exports.apply = function(router) {
    router.post("/playerData", playerDataRoute);
};