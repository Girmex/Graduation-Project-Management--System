
const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs=require("fs")
const path=require("path")
const db = require("../lib/db.js");

/////////////////////////////////////////////
router.get("/files", (req, res) => {

    const directoryPath = "./public/files/";
    const baseUrl = "http://localhost:5000/api/files/";
  
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(5000).send({
          message: "Unable to scan files!",
        });
      }
  
      let fileInfos = [];
  
      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: baseUrl + file,
        });
      });
  
      res.status(200).send(fileInfos);
    });
  });
  
  router.get("/files/:name", (req, res) => {
    const fileName = req.params.name;
    const directoryPath = "./public/files/";
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) throw err
    });
  });

  module.exports = router;