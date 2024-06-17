const router = require("express").Router();

module.exports = {
  setupRoutes: (app) => {
    app.use("/", router);
  },
};
