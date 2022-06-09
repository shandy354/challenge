const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const app = express();
// const swaggerJSON = require("./swagger.json");
// const swaggerUI = require("swagger-ui-express");

const users = require("./routes/user.routes");
const auths = require("./routes/auth.routes")
var corsOptions = {
  origin: "http://localhost:8081"
};

// app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));
app.use(logger("dev"));

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use("/api",users);
app.use("/aut",auths);

  app.use((req, res, next)=>{
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
    });
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


