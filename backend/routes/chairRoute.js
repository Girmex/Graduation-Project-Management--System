const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const db = require("../lib/db.js");
const userMiddleware = require("../middleware/users.js");
const userRolecheck = require("../middleware/rolevalidation.js");

router.post("/sign-up", (req, res) => {
    console.log(req.body.username);
    db.query(
      `SELECT * FROM students WHERE LOWER(username) = LOWER('${req.body.username}');`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({
            msg: "This username is already in use!",
          });
        } else {
          // username is available
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                msg: err,
              });
            } else {
              // has hashed pw => add to database
              db.query(
                `INSERT INTO students (department_id,first_name,second_name,last_name,gender,username, password, role) 
                VALUES ( '${req.body.department_id}','${req.body.first_name}','${
                  req.body.second_name
                }','${req.body.last_name}','${req.body.gender}','${
                  req.body.username
                }', ${db.escape(hash)},1)`,
                (err, result) => {
                  if (err) {
                    throw err;
                    return res.status(400).send({
                      msg: err,
                    });
                  }
                  return res.status(201).send({
                    msg: "Registered!",
                  });
                }
              );
            }
          });
        }
      }
    );
  });

  module.exports = router;
  