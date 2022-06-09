const express = require("express");
const router = express.Router();
const { verify } = require("../middleware");
const controller = require("../controller/auth.Controller");

  router.post(
    "/auth/signup",
    [
      verify.checkDuplicateUsernameOrEmail,
      verify.checkRolesExisted
    ],
    controller.signup
  );
  router.post("/auth/signin", controller.signin);
  module.exports = router;