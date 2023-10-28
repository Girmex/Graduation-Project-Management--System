const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const db = require("../lib/db.js");
const userMiddleware = require("../middleware/users.js");
const userRolecheck = require("../middleware/rolevalidation.js");
router.post("/login", (req, res, next) => {
  db.query(
    `SELECT * FROM login WHERE username = '${req.body.username}'`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Username or password is incorrect!",
        });
      }

      // check password
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: "Username or password is incorrect!",
            });
          }

          if (bResult) {
            const token = jwt.sign( {username: result[0].username, userId: result[0].id,},"SECRETKEY", { expiresIn: "2m", });
            res.send({
              msg: "Logged in!",
              token,
              user: result[0],
            }); 
            console.log(token)
          }
         
        }
      );
    }
  );
});
  module.exports = router;
  