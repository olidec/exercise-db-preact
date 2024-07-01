const router = require("express").Router();

router.use("/dashboard", require("./dashboard.cjs"));

router.use("/login", require("./login.cjs"));

router.use("/register", require("./register.cjs"));

router.use("/api/ex", require("./ex.cjs"));

router.use("/api/cat", require("./cat.cjs"));

router.use("/api/subcat", require("./subcat.cjs"));

router.use("/api/download", require("./download.cjs"));



module.exports = {
  setupRoutes: (app) => {
    app.use("/", router);
  },
};
