const express = require("express");

const userBiodata = require("../models").userBiodata;
module.exports = {
  // create
  createUser: (req, res) => {
    let { name, region, gender, userId } = req.body;
    userBiodata
      .create({
        name,
        region,
        gender,
        userId,
      })
      .then((user) => {
        return res
          .status(200)
          .json({
            message: "User created successfully",
            user,
          })
          .catch(err => {
            return res.status(402).json({ err });
          });
      });
  },

  updateUser: (req, res) => {
    const { name, region, gender, userId } = req.body;
    let id = req.params.id;

    userBiodata
      .findOne({
        where: { id: id },
      })
      .then((user) => {
        if (user) {
          user.update({ name, region, gender, userId }).then((updateUser) => {
            return res.status(202).json({
              message: "User updated successfully",
              updateUser,
            });
          });
        } else {
          return res.status(200).json({
            message: "User not found",
          });
        }
      })
      .catch((error) => {
        return res.status(401).json({
          error: error,
        });
      });
  },

  // get

  getAll: (req, res) => {
    userBiodata
      .findAll({
        attributes: ["id", "name", "region", "gender", "userId"],
        //limit: 5,
        order: [["id", "DESC"]],
      })
      .then((users) => {
        return res.status(200).json({
          users,
        });
      })
      .catch((err) => {
        return res.status(402).json({ err });
      });
  },

  // get

  getIdUser: (req, res) => {
    let id = req.params.id;

    userBiodata
      .findByPk(id)
      .then((user) => {
        return res.status(200).json({ user });
      })
      .catch((error) => {
        return res.status(402).json({ error });
      });
  },

  // delete

  deleteIdUser: (req, res) => {
    let id = req.params.id;

    userBiodata
      .destroy({
        where: { id: id },
      })
      .then(() => {
        return res.status(200).json({
          message: "User Deleted successfully",
        });
      })
      .catch((error) => {
        return res.status(400).json({ error });
      });
  },
};
