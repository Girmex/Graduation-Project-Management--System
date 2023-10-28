const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const db = require("../lib/db.js");
const multer = require("multer");
const PDFParser = require("pdf-parse");
const {
  calculateVector,summarizeText,
  calculateCosineSimilarity,
  checkPlagiarism,
} = require("../middleware/plagiarismChecker.js");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destinationFolder = "public/files";

    // Determine the destination folder based on an additional identifier (e.g., file name or field name)
    if (file.fieldname === "file1") {
      destinationFolder = "public/Senay";
    } else if (file.fieldname === "file2") {
      destinationFolder = "public/Solomon";
    }

    cb(null, destinationFolder); // Set the destination folder dynamically
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    cb(null, originalName); // Use the original file name as the saved filename
  },
});

// Create a Multer instance with the configured storage
const upload = multer({ storage });

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    console.log("No file upload");
    res.send("cannot send");
  } else {
    var src = req.file.filename;
    "INSERT INTO files (name, description, advisor, filePath,) VALUES (?, ?, ?, ?)",
      [name, description, advisor, path];
    var url = "http://localhost:5000/files/" + src;
    var update = `UPDATE projects set url = '${url}' where id=0`;
    db.query(update, (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      console.log(result);
    });
  }
});
router.delete("/remove/:name", (req, res) => {
  const fileName = req.params.name;
  const directoryPath = "./public/files/";
  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }
    res.status(200).send({
      message: "File is deleted.",
    });
  });
});

router.post( "/repo", upload.fields([
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
  ]),
  async (req, res) => {
    const title = req.body.title;
    const advisor = req.body.advisor;
    const students = req.body.students;
    const date = req.body.date;
    const description = req.body.description;
    const file1 = req.files["file1"][0];
    const file2 = req.files["file2"][0];
    const file1Name = file1.originalname;
    const file2Name = file2.originalname;

    console.log(file1Name);
    console.log(description);
    console.log(date);
    var url = "http://localhost:5000/files/" + file1Name;
    var url2 = "http://localhost:5000/files/" + file2Name;
    var sql =
      "INSERT INTO repo (name, description, advisor, students, url,url2) VALUES (?, ?, ?, ?,?,?)";
    db.query(
      sql,
      [title, description, advisor, students, url, url2],
      (err, result) => {
        if (err) {
          res.send(err);
          console.log(err);
        }
        console.log(result);
      }
    );
  }
);

router.post("/plagiarism", upload.single("file"), async (req, res) => {
  const file = req.file;
  const filePath = file.path;

  try {
    const data = await PDFParser(filePath);
    const content = data.text;
    const vector = calculateVector(content);
    const summary = summarizeText(content,"Introduction");
    console.log(summary)

    db.query("SELECT vector, url FROM users_file", (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ message: "Error querying database" });
      }

      const similarFiles = [];

      for (const result of results) {
        const existingVector = JSON.parse(result.vector);
        const existingUrl = result.url;
        const similarity = calculateCosineSimilarity(vector, existingVector);
        if (checkPlagiarism(similarity)) {
          similarFiles.push({ url: existingUrl, similarity: similarity * 100 });
        }
      }
      if (similarFiles.length > 0) {
        fs.unlinkSync(filePath); // Delete the file if plagiarism detected
        console.log({ message: 'Plagiarism detected', similarFiles });
      }


      else{
      const newFile = { vector: JSON.stringify(vector), url: file.filename };
      db.query("INSERT INTO users_file  SET ?", newFile, (err) => {
        if (err) {
          console.error("Error inserting into database:", err);
          return res
            .status(500)
            .json({ message: "Error inserting into database" });
        }

        console.log({ similarFiles });
      });
    }
    });
  } catch (error) {
    console.error("Error parsing PDF:", error);
    res.status(500).json({ message: "Error parsing PDF" });
  }
});


// ... existing code ...

router.get('/similarity/:filename', (req, res) => {
  const filename = req.params.filename;

  db.query('SELECT vector, url FROM users_file WHERE url = ?', [filename], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Error querying database' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'File not found' });
    }

    const uploadedVector = JSON.parse(results[0].vector);
    const similarFiles = [];

    db.query(`SELECT vector, url FROM users_file where url != '${req.params.filename}'`, (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ message: 'Error querying database' });
      }

      for (const result of results) {
        if (result.url !== filename) {
          const existingVector = JSON.parse(result.vector);
          const existingUrl = result.url;
          let similarity = calculateCosineSimilarity(uploadedVector, existingVector);
             if(similarity==null){
              similarity=0;
             }
          if (checkPlagiarism(similarity)) {
            similarFiles.push({ url: existingUrl, similarity: similarity * 100 });
          }
        }
      }
      res.json({ similarity: similarFiles });
    });
  });
});


module.exports = router;
