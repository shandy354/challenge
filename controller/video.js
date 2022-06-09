const express = require("express");

const Videos = require("../models").Video;
    
module.exports={
    
  upload :(req, res) => {
    try{
        const video = Videos.create({
            userId:req.body.userId,
            video: req.file.path
        })
        res.status(201).json({
            message:"success upload",
            video,
        })
      } catch(error){
          res.status(404).json({
              message:error.message
          })
      }
    }
}