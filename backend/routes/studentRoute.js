const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs=require("fs")
const path=require("path")
const db = require("../lib/db.js");
router.get("/user_info/:username", (req, res) => {
    let user = req.params.username;
    let sql = `SELECT students.username, students.first_name, students.second_name, students.last_name, departments.department_name  FROM students JOIN departments ON students.department_id = departments.department_id WHERE students.username = '${req.params.username}'`;
  
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    });
  });
  module.exports = router;