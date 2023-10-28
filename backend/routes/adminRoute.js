
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const path=require("path");
const fs=require("fs")
const db = require("../lib/db.js");
const userMiddleware = require("../middleware/users.js");
const userRolecheck = require("../middleware/rolevalidation.js");
router.post('/create-folder/:newFolder', (req, res) => {
  const newFolder = req.params.newFolder;
  const newFolderPath = path.join('./public', newFolder);
  fs.mkdir(newFolderPath, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error creating folder.');
    } else {
      console.log(`Folder ${newFolder} created successfully.`);
      res.send(`Folder ${newFolder} created successfully.`);
    }
  });
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

router.get('/messages/:id',userMiddleware.isLoggedIn, (req, res) => {
  const sql = `SELECT * FROM chat_messages WHERE   group_id=${req.params.id}`;
  db.query(sql, (error, results) => {
    if (error) {
      throw error
    }

    res.status(200).json({
      success: true,
      messages: results
    });
  });
});

router.post('/messages', (req, res) => {
  const message = req.body;
  console.log(message)
  
  const sql = 'INSERT INTO chat_messages SET ?';
  db.query(sql, [message], (error, result) => {
    if (error) 
    {
      console.log(error)
    }
    else   {
     res.send("true")
    }


  });
});



router.get('/chat_messages/:id',(req,res) =>{
  let sql = `select * from chat_messages where group_id=${req.params.id}  order by created_at desc limit 1`;
  db.query(sql,(err,result)=>{
    if(err) {throw err}
    else{
      res.send(result)
    }
  });
});
router.get('/students/:name/:user',(req,res) =>{
  let sql = `select * from students where (NOT username=${req.params.user}) and (first_name like '%${req.params.name}%' or second_name like '%${req.params.name}%' or last_name like '%${req.params.name}%') `;
  db.query(sql,(err,result)=>{
    if(err) {throw err}
    else{
      res.send(result)
    }
   
  });
});
router.get('/group/:user',(req,res) =>{
  let sql=`select * from project_group where student_id1= ${req.params.user} or student_id2= ${req.params.user} or student_id3= ${req.params.user} or student_id4= ${req.params.user} or student_id5= ${req.params.user} `
  db.query(sql,(err,result)=>{
    if(err) {throw err}
    else{
      res.send(result)
    }
  });
});
  
router.get('/receiver_name/:user',(req,res)=>{
  let sql=`select first_name from students where username='${req.params.user}'`
  db.query(sql,(err,result)=>{
    if(err) throw err
    res.send(result)
  })
})
router.get('/repo',(req,res)=>{
  let sql='select * from repo ';
  db.query(sql,(err,result)=>{
    if(err) throw err
    res.send(result)
  })
})

/////////


router.post("/notices", (req, res) => {

  db.query(`INSERT INTO notices (title,detail) VALUES (${req.body.title},${req.body.detail})`, error => {
    if (error) {
      console.error(error);
    } else {
      // Notify all connected clients that a new notification has been added
      console.log("data inserted")
    }
  });
  }) 
  router.post('/lastnotice/:user',(req,res)=>{
const query = `UPDATE notification_user set lastId = ${req.body.lastNoticeId} where username='${req.params.user}'`;
db.query(query, (err, result) => {
if (err) {
  console.log(err);
} 
  console.log('updated successfully.');

})
})
router.get('/notices/:user', (req, res) => {
  const query = `SELECT lastId FROM notification_user where username='${req.params.user}'`;
  db.query(query, (error, results) => {
    if (error) {
      console.log('Error executing query:', error);
    } else {
      const lastNoticeId = Object.assign({}, results[0]).lastId;
      let Id1 =lastNoticeId;
         
        const noticesQuery = `SELECT * FROM notices WHERE  id > ${Id1}`;
        db.query(noticesQuery, (err, noticesResult) => {
          if (err) {
            console.log(err);
           res.send({
            msg:false
           })
          } else {
            res.send(noticesResult);
          }
        });

        console.log(lastNoticeId)
 

      
    }
});

})







     

router.put("/message/:id", (req, res) => {
  console.log(req.params.id)

    let sql = `UPDATE chat_messages SET message = '${req.body.message}' WHERE id = ${req.params.id} `;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("You have updated successfuly");
    });
  });
  router.delete("/message/:id", (req, res) => {
    console.log(req.params.id)
  
      let sql = `delete from chat_messages  WHERE id = ${req.params.id} `;
      db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("You have deleted successfuly");
      });
    });
  

router.get("/secret-route", userMiddleware.isLoggedIn, (req, res) => {
  res.send({msg:'welcome'})
  });
router.get("/check-role/:username", userMiddleware.isLoggedIn, userRolecheck.checkRole('girma1234'),(req, res) => {
    res.send(req.params.username)
    });
  

module.exports = router;
