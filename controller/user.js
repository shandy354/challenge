const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models").User;
module.exports = {
  // update
  updateUser: async (req, res) => {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hashSync(password, 8);
    // bcrypt.hashSync(req.body.password, 8)
    let id = req.params.id;
    User.findOne({
      where: { id: id },
    })
      .then((user) => {
        if (user) {
          user
            .update({ username, email, password: hashed })
            .then((updateUser) => {
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

  // get all users

  getAllUser: (req, res) => {
    User.findAll({
      attributes: ["id", "username", "email", "password"],
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

  // get  user by id

  getIdUser: (req, res) => {
    let id = req.params.id;

    User.findByPk(id)
      .then((user) => {
        return res.status(200).json({ user });
      })
      .catch((error) => {
        return res.status(402).json({ error });
      });
  },

  // delete user id
  deleteIdUser: (req, res) => {
    let id = req.params.id;

    User.destroy({
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
