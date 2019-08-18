const config = require("./common/config/env.config.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const UsersRouter = require("./users/routes.config");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    return next();
  }
});

app.use(bodyParser.json());
UsersRouter.routesConfig(app);

app.listen(config.port, () => {
  console.log("app listening at port %s", config.port);
});
