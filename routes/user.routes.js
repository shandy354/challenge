// BELUM SELESAI 

const express     = require("express");
const router      = express.Router();
const multer = require("multer");
const { authJwt } = require("../middleware");
//const controller = require("../controller/user.Controller");
const userGameController = require("../controller").userGame;
const userBiodata = require ("../controller").userBiodata;
const Upvideo = require("../controller/video")
const email = require("../controller/sendmail");

const videoStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./assets/video");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 10000000, //10mb
  },
  fileFilter(req, file, cb) {
    // upload haya dengan format mp4 and mkv
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      return cb(new Error("Please upload a video"));
    }
    cb(undefined, true);
  },
});

router.get("/test/all", userGameController.getAllUser);
router.get("/biodata/all", userBiodata.getAll);
//  USER ACCOUNT
// USER
  router.put("/test/:id",[authJwt.verifyToken],userGameController.updateUser);
  router.get("/test/:id",[authJwt.verifyToken],userGameController.getIdUser);
  router.post("/video",[authJwt.verifyToken],videoUpload.single("video"),Upvideo.upload);
  router.post("/email",[authJwt.verifyToken],email.email);

// MODERATOR
  router.get("/test/all",[authJwt.verifyToken, authJwt.isModerator],userGameController.getAllUser);
  router.get("/test/:id",[authJwt.verifyToken, authJwt.isModerator],userGameController.getIdUser);

// ADMIN
  router.get("/test/all",[authJwt.verifyToken, authJwt.isAdmin],userGameController.getAllUser);
  router.get("/test/:id",[authJwt.verifyToken, authJwt.isAdmin],userGameController.getIdUser);
  router.put("/test/:id",[authJwt.verifyToken, authJwt.isAdmin],userGameController.updateUser);
  router.delete("/test/:id",[authJwt.verifyToken, authJwt.isAdmin],userGameController.deleteIdUser);

  // USER BIODATA BIODATA
  // user
  router.post("/biodata",[authJwt.verifyToken],userBiodata.createUser);
  router.put("/biodata/:id",[authJwt.verifyToken],userBiodata.updateUser);
  router.get("/biodata/:id",[authJwt.verifyToken],userBiodata.getIdUser);

  // moderator
  router.get("/biodata/all",[authJwt.verifyToken, authJwt.isModerator],userBiodata.getAll);
  router.get("/biodata/:id",[authJwt.verifyToken, authJwt.isModerator],userBiodata.getIdUser);

  // admin
  router.get("/biodata/all",[authJwt.verifyToken, authJwt.isAdmin], userBiodata.getAll);
  router.get("/biodata/:id",[authJwt.verifyToken, authJwt.isAdmin],userBiodata.getIdUser);
  router.post("/biodata",[authJwt.verifyToken, authJwt.isAdmin],userBiodata.createUser);
  router.put("/biodata/:id",[authJwt.verifyToken, authJwt.isAdmin],userBiodata.updateUser);
  router.delete("/biodata/:id",[authJwt.verifyToken, authJwt.isAdmin],userBiodata.deleteIdUser);

  module.exports = router;