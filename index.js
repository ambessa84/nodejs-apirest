const config = require("./common/config/env.config.js");
const express = require("express");
const app = express();

app.use((req, res, next) => {
  return next();
});

app.listen(config.port, () => {
  console.log("app listening at port %s", config.port);
});
