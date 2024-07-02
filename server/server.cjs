if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");

const { setupPassport } = require("./auth/passport-config.cjs");
const { setupMiddleware } = require("./middleware/index.cjs");
const { setupRoutes } = require("./routes/index.cjs");

const app = express();

setupMiddleware(app);
setupPassport(app);
setupRoutes(app);

// start server at port 8000
app.listen(8000, () => console.log("listening on port 8000"));
