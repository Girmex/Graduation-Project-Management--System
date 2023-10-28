const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const app = express();
const bodyparser = require("body-parser");
const mysql = require("mysql");
const multer = require("multer");
const PDFParser = require("pdf-parse");

const path = require("path");
const jwt = require("jsonwebtoken");
const db = require("./lib/db.js");
const roleMiddleware = require("./middleware/rolevalidation.js");
const userMiddleware = require("./middleware/users.js");
app.use(express.static("./public"));
app.use(bodyparser.json());
app.use(cors());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

const {
  calculateVector,
  calculateCosineSimilarity,
  checkPlagiarism,
} = require("./middleware/plagiarismChecker.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destinationFolder = "public/" + req.params.folder;

    // Determine the destination folder based on an additional identifier (e.g., file name or field name)
    if (file.fieldname === "file1") {
      destinationFolder = "public/proposal";
    } else if (file.fieldname === "file2") {
      destinationFolder = "public/final";
    }

    cb(null, destinationFolder); // Set the destination folder dynamically
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    cb(null, originalName); // Use the original file name as the saved filename
  },
});
const upload = multer({ storage });

app.put("/updateStudentProfile/:id", (req, res) => {
  const data = req.body;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      // has hashed pw => add to database
      db.query(
        `UPDATE students SET password=${db.escape(hash)} WHERE id= ${
          req.params.id
        }`,
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
});
app.put("/updateProfile/:id", (req, res) => {
  const data = req.body;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      // has hashed pw => add to database
      db.query(
        `UPDATE staff_member SET password=${db.escape(hash)} WHERE id= ${
          req.params.id
        }`,
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
});

app.put("/updateStudentGroup", (req, res) => {
  const data = req.body;
  let sql = `UPDATE students SET group_id=${req.body.title} WHERE concat(first_name,' ',second_name,' ',last_name)= '${req.body.id1}' or
  concat(first_name,' ',second_name,' ',last_name)= '${req.body.id2}' or concat(first_name,' ',second_name,' ',last_name)= '${req.body.id3}'
  or concat(first_name,' ',second_name,' ',last_name)= '${req.body.id4}'  `;
  db.query(sql, (err, result) => {
    if (err) throw err;

    if (result) {
      let sql2 = `update project set status='Created', student1='${req.body.id1}',student2='${req.body.id2}',student3='${req.body.id3}',student4='${req.body.id4}',date=now() where id= ${req.body.title}`;
      db.query(sql2, (err, result2) => {
        if (err) throw err;
        if (result2) {
          console.log(result2);
          res.send("You have updated successfuly");
        }
      });
    }
  });
});
app.put("/up/:id/:chair", (req, res) => {
  const data = req.body.position;
  let sql = `UPDATE staff_Member SET position=${req.body.position} where id=${req.params.id} `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      if (data == 4) {
        let sql2 = `update staff_Member set position = 7 where id != '${req.params.id}' and chair_id=${req.params.chair} and position=4 `;

        db.query(sql2, (err, result2) => {
          if (err) throw err;
          if (result2) {
            let sql3 = `update chairs set chair_person=${req.params.id} where id=${req.params.chair} `;

            db.query(sql3, (err1, result3) => {
              if (err1) throw err1;
              if (result3) {
                console.log(result3);
              }
            });
          }
        });
      }
      if (data == 3) {
        let sql2 = `update staff_Member set position = 7 where id != '${req.params.id}' and department_id=${req.params.chair} and position=3 `;

        db.query(sql2, (err, result2) => {
          if (err) throw err;
          if (result2) {
            let sql3 = `update departments set department_head =${req.params.id} where department_id=${req.params.chair} `;

            db.query(sql3, (err1, result3) => {
              if (err1) throw err1;
              if (result3) {
                console.log(result3);
              }
            });
          }
        });
      }
      if (data == 2) {
        let sql2 = `update staff_Member set position = 7 where id != '${req.params.id}' and faculty_id=${req.params.chair} and position=2 `;

        db.query(sql2, (err, result2) => {
          if (err) throw err;
          if (result2) {
            let sql3 = `update faculties set faculty_din=${req.params.id} where faculty_id=${req.params.chair} `;

            db.query(sql3, (err1, result3) => {
              if (err1) throw err1;
              if (result3) {
                console.log(result3);
              }
            });
          }
        });
      } else {
        console.log(result);
        res.send("You have updated successfuly");
      }
    }
  });
});
app.put("/updateRoll/:id", (req, res) => {
  const data = req.body;
  let sql = `UPDATE staff_member SET position='${req.body.position}' WHERE id='${req.params.id}'  `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have updated successfuly");
  });
});
app.put("/updateStaffUserProfile/:id", (req, res) => {
  const data = req.body;
  let sql = `UPDATE staff_member SET ${req.body.type}='${req.body.value}' WHERE id='${req.params.id}'  `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have updated successfuly");
  });
});
app.put("/updateStudentUserProfile/:id", (req, res) => {
  const data = req.body;
  let sql = `UPDATE students SET ${req.body.type}='${req.body.value}' WHERE id='${req.params.id}'  `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have updated successfuly");
  });
});
app.post("/addGroup/", (req, res) => {
  const data = req.body;
  let sql = `insert into project SET ? `;
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have inserted successfuly");
  });
});
app.get("/examiner/:type/:value", (req, res) => {
  const data = req.body;
  let sql = `select * from staff_member where position= 5 and ${req.params.type} = '${req.params.value}' and (group_id is null or group_id='' or group_id=0)`;
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});
app.get("/examinerGroup/:value", (req, res) => {
  const data = req.body;
  let sql = `select group_id from project where department_id='${req.params.value}' and date=now() and group_id != 0 group by group_id`;
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});
app.get("/examinerList/:group/:type/:value", (req, res) => {
  const data = req.body;
  let sql = `select * from staff_member where position= 5 and group_id='${req.params.group}' and ${req.params.type}='${req.params.value}'`;
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});
app.get("/examinerProjectList/:group/:type/:value", (req, res) => {
  const data = req.body;
  let sql = `select * from project where group_id='${req.params.group} ' `;
  db.query(sql, data, (err, result) => {
    console.log(result[0])
    if (err) throw err;    if (result[0].chair_id == null || result[0].chair_id == "") {
      let sql2 = `select * from project where group_id='${req.params.group}' and department_id='${req.params.value}' and date=now()`;
      db.query(sql2, data, (err2, result2) => {
        if (err2) throw err2;
        console.log(result2);
        res.json(result2);
      });
    } else {
      let sql3 = `select * from project where group_id='${req.params.group}' and chair_id='${req.params.type}' and date=now()`;
      db.query(sql3, data, (err3, result3) => {
        if (err3) throw err3;
        console.log(result3);
        res.json(result3);
      });
    }
  });
});

app.put("/examinerForm/:type/:value", (req, res) => {
  const data = req.body;
  db.query(
    `SELECT * FROM project WHERE group_id=${req.body.group} and ${req.params.type}='${req.params.value}' and date = now() ;`,
    (err4, result4) => {
      if (result4.length) {
        res.send({
          msg: false,
        });
      } else {
        let sql = `update project set group_id='${req.body.group}' where (advisor='${req.body.advisor1}' or advisor='${req.body.advisor2}' or
        advisor='${req.body.advisor3}' or advisor='${req.body.advisor4}' or advisor='${req.body.advisor5}' or advisor='${req.body.advisor6}' or
        advisor='${req.body.advisor7}' or advisor='${req.body.advisor8}') and ${req.params.type}='${req.params.value}' and date = now() `;
        db.query(sql, data, (err, result) => {
          if (err) throw err;
          if (result) {
            let sql2 = `update staff_member set group_id='${req.body.group}' where (id='${req.body.advisor1}' or id='${req.body.advisor2}' or
   id='${req.body.advisor3}' or id='${req.body.advisor4}' or id='${req.body.advisor5}' or id='${req.body.advisor6}' or
   id='${req.body.advisor7}' or id='${req.body.advisor8}') and ${req.params.type}='${req.params.value}'  `;
            db.query(sql2, data, (err1, result2) => {
              if (err1) throw err1;
              console.log(result);
              res.send({
                msg: true,
              });
            });
          }
        });
      }
    }
  );
});
app.post("/addNotice/", (req, res) => {
  const data = req.body;
  let sql = `insert into notice SET ? `;
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have inserted successfuly");
  });
});
app.get("/noticeList/:id/:value/:type1/:value2", (req, res) => {
  const page = req.params.id;
  const table = req.params.tableName;
  const type1 = req.params.type1;
  const val = req.params.value;

  const val2 = req.params.value2;

  console.log(page);
  const offset = (page - 1) * 6;

  let sql = `SELECT * FROM notice where faculty_id="${val}" ORDER BY date limit ${offset},6 ;
            select * from notice where faculty_Id="${val}" and ${type1}="${val2}" ORDER BY date limit ${offset},6 ;
            
          
            `;

  db.query(sql, (err, result) => {
    let totalPageData = result.length;
    console.log(result.length);
    if (err) throw err;
    console.log("data fetched");
    if (result.length > 0) {
      res.json(result);
    } else {
      res.json("-1");
    }
  });
});
app.post("/addStudent", (req, res) => {
  console.log(req.body.username);
  db.query(
    `SELECT * FROM students WHERE id =  ${req.body.id};`,
    (err, result) => {
      if (result.length) {
        res.send({
          msg: false,
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
              `INSERT INTO students (faculty_id,department_id,chair_id,first_name,second_name,last_name,gender,id,username, password, position,date) 
              VALUES ( '${req.body.faculty_id}','${req.body.department_id}','${
                req.body.chair_id
              }','${req.body.first_name}','${req.body.second_name}','${
                req.body.last_name
              }','${req.body.gender}','${req.body.id}','${
                req.body.username
              }', ${db.escape(hash)},6,now())`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err,
                  });
                }
                res.send({
                  msg: true,
                });
              }
            );
          }
        });
      }
    }
  );
});

app.post("/addStaffMember", (req, res) => {
  console.log(req.body.username);
  db.query(
    `SELECT * FROM staff_member WHERE id=${req.body.id};`,
    (err, result) => {
      if (result.length) {
        res.send({
          msg: false,
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
              `INSERT INTO staff_member (faculty_id,department_id,chair_id,first_name,second_name,last_name,gender,id,username, password, position,qualification) 
              VALUES ( '${req.body.faculty_id}','${req.body.department_id}','${
                req.body.chair_id
              }','${req.body.first_name}','${req.body.second_name}','${
                req.body.last_name
              }','${req.body.gender}','${req.body.id}','${
                req.body.username
              }', ${db.escape(hash)},${req.body.position},'msc')`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err,
                  });
                } else {
                  let data = req.body.position;
                  if (data == 4) {
                    let sql2 = `update staff_Member set position = 7 where id != '${req.body.id}' and chair_id=${req.body.chair_id} and position=4 `;

                    db.query(sql2, (err, result2) => {
                      if (err) throw err;
                      if (result2) {
                        let sql3 = `update chairs set chair_person=${req.body.id} where id=${req.body.chair_id} `;

                        db.query(sql3, (err1, result3) => {
                          if (err1) throw err1;
                          if (result3) {
                            console.log(result3);
                          }
                        });
                      }
                    });
                  }
                  if (data == 3) {
                    let sql2 = `update staff_Member set position = 7 where id != '${req.body.id}' and department_id=${req.body.department_id} and position=3 `;

                    db.query(sql2, (err, result2) => {
                      if (err) throw err;
                      if (result2) {
                        let sql3 = `update departments set department_head =${req.body.id} where department_id=${req.body.department_id} `;

                        db.query(sql3, (err1, result3) => {
                          if (err1) throw err1;
                          if (result3) {
                            console.log(result3);
                          }
                        });
                      }
                    });
                  }
                  if (data == 2) {
                    let sql2 = `update staff_Member set position = 7 where id != '${req.body.id}' and faculty_id=${req.body.faculty_id} and position=2 `;

                    db.query(sql2, (err, result2) => {
                      if (err) throw err;
                      if (result2) {
                        let sql3 = `update faculties set faculty_din=${req.body.id} where faculty_id=${req.body.faculty_id} `;

                        db.query(sql3, (err1, result3) => {
                          if (err1) throw err1;
                          if (result3) {
                            console.log(result3);
                          }
                        });
                      }
                    });
                  } else {
                    console.log(result);
                  }
                }
                res.send({
                  msg: true,
                });
              }
            );
          }
        });
      }
    }
  );
});
app.post("/login", (req, res, next) => {
  db.query(
    `SELECT * FROM login WHERE username = '${req.body.username}'`,
    (err, result) => {
      // user does not exists
      if (err) {
        console.log(err);
        return res.status(400).send({
          msg: err,
        });
      }

      if (!result.length) {
        console.log("incorrect");
        return res.send({
          msg: false,
        });
      }

      // check password
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          if (bErr) {
            console.log("correct pass");
            res.send({
              message: false,
            });
          }

          if (bResult) {
            const token = jwt.sign(
              { username: result[0].username },
              "SECRETKEY",
              { expiresIn: "1h" }
            );
            res.send({
              msg: true,
              token,
              user: result[0],
            });
          } else {
            res.send({
              msg: false,
            });
          }
        }
      );
    }
  );
});
app.post("/addDepartment/", (req, res) => {
  const facultyId = req.params.id;
  const data = req.body;
  let sql = `insert into departments SET ? `;
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have inserted successfuly");
  });
});
app.post("/addChair/", (req, res) => {
  const facultyId = req.params.id;
  const data = req.body;
  let sql = `insert into chairs SET ? `;
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have inserted successfuly");
  });
});
app.post("/addFaculty/", (req, res) => {
  const facultyId = req.params.id;
  const data = req.body;
  let sql = `insert into faculties SET ? `;
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have inserted successfuly");
  });
});
app.get("/listLength/:tableName/:type/:value/:type2/:value2", (req, res) => {
  const table = req.params.tableName;
  const type = req.params.type;
  const val = req.params.value;
  const type2 = req.params.type2;
  const val2 = req.params.value2;

  let sql = `SELECT * FROM ${table} where ${type}="${val}";
           SELECT * FROM ${table} where ${type}="${val}" and ${type2}="${val2}";
           `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get("/adminListLength/:tableName/:type/:value", (req, res) => {
  const table = req.params.tableName;
  const type = req.params.type;
  const val = req.params.value;

  let sql = `SELECT * FROM ${table};
           SELECT * FROM ${table} where ${type}="${val}" ;
           `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get("/ListLength/:type/:value", (req, res) => {
  let sql = ` SELECT concat(first_name,' ',second_name,' ',last_name) as fullName,id FROM students where ${req.params.type}='${req.params.value}' and group_id is null;
           `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get("/facultyList/:faculty", (req, res) => {
  const faculty_Id = req.params.faculty;

  let sql = `SELECT * FROM faculties where faculty_id="${faculty_Id}" `;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get("/staffInfo/:id", (req, res) => {
  const Id = req.params.id;

  let sql = `select staff_member.first_name,staff_member.position, staff_member.second_name, staff_member.last_name ,staff_member.phone_number,staff_member.e_mail,
           staff_member.id,staff_member.department_id,staff_member.faculty_id,staff_member.chair_id, staff_member.gender, staff_member.username, staff_member.password,
           faculties.faculty_name, departments.department_name, role.role_name, chairs.name from staff_member 
           left join faculties on staff_member.faculty_id= faculties.faculty_id 
           left join departments on staff_member.department_id= departments.department_id 
           left join chairs on staff_member.chair_id= chairs.id 
           left join role on staff_member.position= role.id where staff_member.id=${Id} `;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get("/studentInfo/:type/:id", (req, res) => {
  const Id = req.params.id;

  let sql = `select students.first_name, students.second_name, students.last_name ,
           students.id, students.gender, students.username, students.password, students.phone_number,students.e_mail,
           faculties.faculty_name, departments.department_name, role.role_name, chairs.name, project.title,project.advisor from students 
           left join faculties on students.faculty_id= faculties.faculty_id 
           left join departments on students.department_id= departments.department_id 
           left join chairs on students.chair_id= chairs.id 
           left join project on students.group_id= project.id
           left join role on students.position= role.id where students.${req.params.type}=${Id} `;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get("/departmentList/:faculty", (req, res) => {
  const faculty_Id = req.params.faculty;

  let sql = `SELECT * FROM departments where faculty_id="${faculty_Id}" `;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});

app.get("/chairList/:type/:value", (req, res) => {
  const type = req.params.type;
  const val = req.params.value;

  let sql = `SELECT * FROM chairs where ${type}="${val}"`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get("/roleList", (req, res) => {
  let sql = `SELECT * FROM role where role_name !="student"`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get(
  "/searchStudent/:tableName/:type1/:value1/:type2/:value2/:searchType1/:searchType2/:search",
  (req, res) => {
    const table = req.params.tableName;
    const type = req.params.type1;
    const val = req.params.value1;
    const type2 = req.params.type2;
    const val2 = req.params.value2;
    const searchType1 = req.params.searchType1;
    const searchType2 = req.params.searchType2;
    const search = req.params.search;
    let sql = `select students.first_name, students.second_name, students.last_name ,students.id, year(students.date) as year,
    departments.department_name from students left join departments on students.department_id= departments.department_id WHERE ${type}="${val}" AND students.${searchType1} LIKE "%${search}%" OR ${type}="${val}" AND students.${searchType2} LIKE "%${search}%";
           select students.first_name, students.second_name, students.last_name ,students.id, year(students.date) as year,
           departments.department_name from students left join departments on students.department_id= departments.department_id WHERE ${type}="${val}" and ${type2}="${val2}" AND students.${searchType1} LIKE "%${search}%" OR ${type}="${val}" and ${type2}="${val2}" AND students.${searchType2} LIKE "%${search}%";
           select students.first_name, students.second_name, students.last_name ,students.id, year(students.date) as year,
           departments.department_name from students left join departments on students.department_id= departments.department_id WHERE students.${searchType1} LIKE "%${search}%" OR students.${searchType2} LIKE "%${search}%"
            `;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("data fetched");
      res.json(result);
    });
  }
);
app.get(
  "/search/:tableName/:type1/:value1/:type2/:value2/:searchType1/:searchType2/:search",
  (req, res) => {
    const table = req.params.tableName;
    const type = req.params.type1;
    const val = req.params.value1;
    const type2 = req.params.type2;
    const val2 = req.params.value2;
    const searchType1 = req.params.searchType1;
    const searchType2 = req.params.searchType2;
    const search = req.params.search;
    let sql = `SELECT * FROM ${table} WHERE ${type}="${val}" AND ${searchType1} LIKE "%${search}%" OR ${type}="${val}" AND ${searchType2} LIKE "%${search}%";
           SELECT * FROM ${table} WHERE ${type}="${val}" and ${type2}="${val2}" AND ${searchType1} LIKE "%${search}%" OR ${type}="${val}" and ${type2}="${val2}" AND ${searchType2} LIKE "%${search}%";
           select staff_member.first_name, staff_member.second_name, staff_member.last_name ,
            project.id, project.title, project.status, project.date from project left join staff_member on project.advisor= staff_member.id 
            where project.${type}="${val}" and ${type2}="${val2}" AND project.title LIKE "%${search}%" OR staff_member.${type}="${val}" and ${type2}="${val2}" AND staff_member.first_name LIKE "%${search}%" ORDER BY project.title;
            SELECT * FROM ${table} WHERE ${searchType1} LIKE "%${search}%" OR ${searchType2} LIKE "%${search}%";
            select staff_member.first_name, staff_member.second_name, staff_member.last_name ,departments.department_name,faculties.faculty_name,chairs.name,
            project.id, project.title, project.status, project.date from project left join staff_member on project.advisor= staff_member.id 
            left join departments on project.department_id=departments.department_id
            left join faculties on project.faculty_id= faculties.faculty_id
            left join chairs on project.chair_id= chairs.id
            where project.${type}="${val}"  AND project.title LIKE "%${search}%" OR staff_member.${type}="${val}" AND staff_member.first_name LIKE "%${search}%" ORDER BY project.title;
            `;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("data fetched");
      res.json(result);
    });
  }
);
app.get(
  "/searchProject/:tableName/:type1/:value1/:type2/:value2/:searchType1/:searchType2/:search",
  (req, res) => {
    const table = req.params.tableName;
    const type = req.params.type1;
    const val = req.params.value1;
    const type2 = req.params.type2;
    const val2 = req.params.value2;
    const searchType1 = req.params.searchType1;
    const searchType2 = req.params.searchType2;
    const search = req.params.search;
    let sql = `select * from allproject where ${type}='${val}' and ${searchType1} like '%${search}%';
               select * from allproject where ${type}='${val}' and ${type2}='${val2}' and ${searchType1} like '%${search}%' or ${type}='${val}' and ${type2}='${val2}' and ${searchType2} like '%${search}%';
               select * from allproject where ${searchType1} like '%${search}%';`;
    // select staff_member.first_name,departments.department_name,chairs.name, staff_member.second_name, staff_member.last_name ,
    // project.id, project.title, project.status, year(project.date) as year from project
    // left join staff_member on project.advisor= staff_member.id
    // left join departments on project.department_id=departments.department_id
    // left join chairs on project.chair_id=chairs.id WHERE ${type}="${val}" AND ${searchType1} LIKE "%${search}%" OR ${type}="${val}" AND ${searchType2} LIKE "%${search}%";
    // select staff_member.first_name,departments.department_name,chairs.name, staff_member.second_name, staff_member.last_name ,
    // project.id, project.title, project.status, year(project.date) as year from project
    // left join staff_member on project.advisor= staff_member.id
    // left join departments on project.department_id=departments.department_id
    // left join chairs on project.chair_id=chairs.id WHERE ${type}="${val}" and ${type2}="${val2}" AND ${searchType1} LIKE "%${search}%" OR ${type}="${val}" and ${type2}="${val2}" AND ${searchType2} LIKE "%${search}%";
    // select staff_member.first_name,departments.department_name,chairs.name, staff_member.second_name, staff_member.last_name ,
    // project.id, project.title, project.status, year(project.date) as year from project
    // left join staff_member on project.advisor= staff_member.id
    // left join departments on project.department_id=departments.department_id
    // left join chairs on project.chair_id=chairs.id WHERE ${searchType1} LIKE "%${search}%" OR ${searchType2} LIKE "%${search}%";

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("data fetched");
      res.json(result);
    });
  }
);
app.get(
  "/searchStaff/:tableName/:type1/:value1/:type2/:value2/:searchType1/:searchType2/:search",
  (req, res) => {
    const table = req.params.tableName;
    const type = req.params.type1;
    const val = req.params.value1;
    const type2 = req.params.type2;
    const val2 = req.params.value2;
    const searchType1 = req.params.searchType1;
    const searchType2 = req.params.searchType2;
    const search = req.params.search;
    let sql = `SELECT * FROM ${table} WHERE ${type}="${val}" AND ${searchType1} LIKE "%${search}%" OR ${type}="${val}" AND ${searchType2} LIKE "%${search}%";
           SELECT * FROM ${table} WHERE ${type}="${val}" and ${type2}="${val2}" AND ${searchType1} LIKE "%${search}%" OR ${type}="${val}" and ${type2}="${val2}" AND ${searchType2} LIKE "%${search}%";
      
            select staff_member.first_name, staff_member.second_name, staff_member.last_name , staff_member.position,
            staff_member.id, staff_member.chair_id, staff_member.department_id,staff_member.faculty_id,chairs.name,
            faculties.faculty_name,departments.department_name from staff_member left join chairs on staff_member.chair_id= chairs.id
            left join departments on staff_member.department_id=departments.department_id
            left join faculties on staff_member.faculty_id=faculties.faculty_id 
            where staff_member.${type}='${val}' and staff_member.${type2}="${val2}" and staff_member.${searchType1} 
            like"%${search}%" or staff_member.${type}='${val}'
             and staff_member.${type2}="${val2}" and staff_member.${searchType2} like"%${search}%" ORDER BY 
             staff_member.first_name limit 6 ;
             select staff_member.first_name, role.role_name, staff_member.second_name, staff_member.last_name , staff_member.position,
             staff_member.id, staff_member.chair_id, staff_member.department_id,staff_member.faculty_id,chairs.name,
             faculties.faculty_name,departments.department_name from staff_member 
             left join chairs on staff_member.chair_id= chairs.id
             left join role on staff_member.position= role.id
             left join departments on staff_member.department_id=departments.department_id
             left join faculties on staff_member.faculty_id=faculties.faculty_id 
             where staff_member.${searchType1} like"%${search}%" or staff_member.${searchType2} like"%${search}%" ORDER BY 
              staff_member.first_name limit 6 ;
             select staff_member.first_name, role.role_name, staff_member.second_name, staff_member.last_name , staff_member.position,
             staff_member.id, staff_member.chair_id, staff_member.department_id,staff_member.faculty_id,chairs.name,
             faculties.faculty_name,departments.department_name from staff_member 
             left join chairs on staff_member.chair_id= chairs.id
             left join role on staff_member.position= role.id
             left join departments on staff_member.department_id=departments.department_id
             left join faculties on staff_member.faculty_id=faculties.faculty_id 
             where staff_member.${type}='${val}' and staff_member.${searchType1} 
             like"%${search}%" or staff_member.${type}='${val}'
               and staff_member.${searchType2} like"%${search}%" ORDER BY 
              staff_member.id limit 6 ;`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("data fetched");
      res.json(result);
    });
  }
);
app.get(
  "/ListProject/:id/:tableName/:type1/:value/:type2/:value2/:orderType",
  (req, res) => {
    const page = req.params.id;
    const table = req.params.tableName;
    const type1 = req.params.type1;
    const val = req.params.value;
    const type2 = req.params.type2;
    const val2 = req.params.value2;
    const orderType = req.params.orderType;
    console.log(page);
    const offset = (page - 1) * 6;

    let sql = `SELECT * FROM ${table} where ${type1}="${val}" ORDER BY ${orderType} limit ${offset},6; 
    SELECT * FROM ${table} where ${type1}="${val}" and ${type2}="${val2}" ORDER BY ${orderType} limit ${offset},6;
    SELECT * FROM ${table}  ORDER BY ${orderType} limit ${offset},6; 
            `;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("data fetched");
      if (result.length > 0) {
        res.json(result);
      } else {
        res.json("-1");
      }
    });
  }
);
app.get(
  "/List/:id/:tableName/:type1/:value/:type2/:value2/:orderType",
  (req, res) => {
    const page = req.params.id;
    const table = req.params.tableName;
    const type1 = req.params.type1;
    const val = req.params.value;
    const type2 = req.params.type2;
    const val2 = req.params.value2;
    const orderType = req.params.orderType;
    console.log(page);
    const offset = (page - 1) * 6;

    let sql = `SELECT * FROM ${table} where ${type1}="${val}" ORDER BY ${orderType} limit ${offset},6 ;
            select * from ${table} where ${type1}="${val}" and ${type2}="${val2}" ORDER BY ${orderType} limit ${offset},6 ;
            select staff_member.first_name, staff_member.second_name, staff_member.last_name ,
            project.id, project.title,project.best_project, project.status, project.date from project left join staff_member on project.advisor= staff_member.id 
            where project.${type1}='${val}' and ${type2}="${val2}" ORDER BY project.id limit ${offset},6;
            SELECT * FROM ${table} ORDER BY ${orderType} limit ${offset},6;
            select staff_member.first_name,departments.department_name,chairs.name, staff_member.second_name, staff_member.last_name ,
            project.id, project.title, project.status, year(project.date) as year from project 
            left join staff_member on project.advisor= staff_member.id 
            left join departments on project.department_id=departments.department_id
            left join chairs on project.chair_id=chairs.id
            where project.${type1}='${val}' ORDER BY project.id limit ${offset},6;
            select * from ${table} ORDER BY ${orderType} limit ${offset},6;
           
            
            `;

    db.query(sql, (err, result) => {
      let totalPageData = result.length;
      console.log(result.length);
      if (err) throw err;
      console.log("data fetched");
      if (result.length > 0) {
        res.json(result);
      } else {
        res.json("-1");
      }
    });
  }
);
app.get("/adminList/:id/:tableName/:type1/:value/:orderType", (req, res) => {
  const page = req.params.id;
  const table = req.params.tableName;
  const type1 = req.params.type1;
  const val = req.params.value;
  const orderType = req.params.orderType;
  console.log(page);
  const offset = (page - 1) * 6;

  let sql = `SELECT * FROM ${table} where ${type1}="${val}" ORDER BY ${orderType} limit ${offset},6 ;
          `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get(
  "/ListStudent/:id/:tableName/:type1/:value/:type2/:value2/:orderType",
  (req, res) => {
    const page = req.params.id;
    const table = req.params.tableName;
    const type1 = req.params.type1;
    const val = req.params.value;
    const type2 = req.params.type2;
    const val2 = req.params.value2;
    const orderType = req.params.orderType;
    console.log(page);
    const offset = (page - 1) * 6;

    let sql = `SELECT * FROM ${table} where ${type1}="${val}" ORDER BY ${orderType} limit ${offset},6 ;
            select * from ${table} where ${type1}="${val}" and ${type2}="${val2}" ORDER BY ${orderType} limit ${offset},6 ;
          
            select * from students;
            select students.first_name, students.second_name, students.last_name ,students.id, year(students.date) as year,
            departments.department_name from students left join departments on students.department_id= departments.department_id
            ORDER BY students.id limit ${offset},6;
            select students.first_name, students.second_name, students.last_name ,students.id, year(students.date) as year,
            departments.department_name from students left join departments on students.department_id= departments.department_id
            where ${type1}='${val}' ORDER BY students.id limit ${offset},6;
            `;

    db.query(sql, (err, result) => {
      let totalPageData = result.length;
      console.log(result.length);
      if (err) throw err;
      console.log("data fetched");
      if (result.length > 0) {
        res.json(result);
      } else {
        // select students.first_name, students.second_name, students.last_name , students.date,
        // project.id, project.title, project.status, project.date,project.advisor from students left join project on students.group_id= project.id
        // where project.${type2}='${val2}' and ${type1}="${val}" ORDER BY project.id limit ${offset},6;
        res.json("-1");
      }
    });
  }
);
app.get("/update_chairPerson/:id/:name", (req, res) => {
  const student_id = req.params.id;
  const chair_name = req.params.name;
  let sql2 = `UPDATE chairs set chairPerson=(select advisor_id from staff_member where first_name="${chair_name}") where id="${student_id}"`;
  db.query(sql2, (err, result) => {
    if (err) throw console.log("you have insert unknown advisor");
    console.log(result);
    res.json(result);
  });
});
app.get(
  "/staffList/:id/:tableName/:type1/:value/:type2/:value2/:orderType",
  (req, res) => {
    const page = req.params.id;
    const table = req.params.tableName;
    const type1 = req.params.type1;
    const val = req.params.value;
    const type2 = req.params.type2;
    const val2 = req.params.value2;
    const orderType = req.params.orderType;
    console.log(page);
    const offset = (page - 1) * 6;

    let sql = `SELECT * FROM ${table} where ${type1}="${val}" ORDER BY ${orderType} limit ${offset},6 ;
            select * from ${table} where ${type1}="${val}" and ${type2}="${val2}" ORDER BY ${orderType} limit ${offset},6 ;
          
            select staff_member.first_name, staff_member.second_name, staff_member.last_name , staff_member.position,
            staff_member.id, staff_member.chair_id, staff_member.department_id,staff_member.faculty_id,chairs.name,faculties.faculty_name,departments.department_name from staff_member left join chairs on staff_member.chair_id= chairs.id
            left join departments on staff_member.department_id=departments.department_id
            left join faculties on staff_member.faculty_id=faculties.faculty_id 
            where staff_member.${type1}='${val}' and staff_member.${type2}="${val2}" ORDER BY staff_member.id limit ${offset},6;
            select staff_member.first_name, staff_member.second_name, staff_member.last_name , staff_member.position,
            staff_member.id, role.role_name, staff_member.chair_id, staff_member.department_id,staff_member.faculty_id,chairs.name,faculties.faculty_name,departments.department_name from staff_member
            left join chairs on staff_member.chair_id= chairs.id
            left join departments on staff_member.department_id=departments.department_id
            left join faculties on staff_member.faculty_id=faculties.faculty_id 
            left join role on staff_member.position=role.id
             ORDER BY staff_member.id limit ${offset},6;
            select staff_member.first_name, staff_member.second_name, staff_member.last_name , staff_member.position,
            staff_member.id, role.role_name, staff_member.chair_id, staff_member.department_id,staff_member.faculty_id,chairs.name,faculties.faculty_name,departments.department_name from staff_member
            left join chairs on staff_member.chair_id= chairs.id
            left join departments on staff_member.department_id=departments.department_id
            left join faculties on staff_member.faculty_id=faculties.faculty_id 
            left join role on staff_member.position=role.id
            where staff_member.${type1}='${val}' ORDER BY staff_member.id limit ${offset},6;
            
            `;

    db.query(sql, (err, result) => {
      let totalPageData = result.length;
      console.log(result.length);
      if (err) throw err;
      console.log("data fetched");
      if (result.length > 0) {
        res.json(result);
      } else {
        res.json("-1");
      }
    });
  }
);
app.get("/updatenotice/:id", (req, res) => {
  let tit = "abcde";
  let sql = `UPDATE notice SET title = '${tit}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have updated successfuly");
  });
});
app.get("/updateProjectTitle/:id/:title", (req, res) => {
  let tit = req.params.title;
  let sql = `UPDATE selected_project SET title = '${tit}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have updated successfuly");
  });
});
app.get("/advisorStudentList/:id", (req, res) => {
  let tit = req.params.title;
  let sql = `select students.id,students.first_name,students.second_name,students.last_name,students.chair_id,students.department_id,students.phone_number,
            students.e_mail,project.advisor,project.title from students left join project on students.group_id=project.id where project.advisor='${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});
//end of faculty page
//girma
app.get("/messages/:id", (req, res) => {
  const sql = `SELECT * FROM chat_messages WHERE   group_id=${req.params.id} order by id`;
  db.query(sql, (error, results) => {
    if (error) {
      throw error;
    }

    res.send(results);
  });
});

app.post("/api/messages", (req, res) => {
  const message = req.body;
  console.log("message is sent successfully");

  const sql = "INSERT INTO chat_messages SET ?";
  db.query(sql, [message], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send("true");
    }
  });
});

app.get("/user/:id", (req, res) => {
  let sql = `select * from login where id=${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.get("/chat_messages/:id", (req, res) => {
  let sql = `select * from chat_messages where group_id=${req.params.id}  order by created_at desc limit 1`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.post("/notices", (req, res) => {
  let data = req.body;
  let sql = "INSERT INTO notices set ?";
  db.query(sql, data, (err, result) => {
    if (err) {
      throw err;
    } else {
      const notificationId = result.insertId;
      console.log(notificationId);
      // Fetch a list of user IDs from the 'users' table
      db.query("SELECT username FROM students", (error, results) => {
        if (error) {
          console.error(error);
        } else {
          const userIds = results.map((result) => result.username);
          const values = userIds
            .map((userId) => `(${notificationId}, ${userId},0)`)
            .join(",");
          // Insert the list of user IDs into the 'notifications_users' table
          db.query(
            `INSERT INTO notification_user (notification_id, username,read_status) VALUES ${values}`,
            (error) => {
              if (error) {
                console.error(error);
              } else {
                // Notify all connected clients that a new notification has been added
                console.log("data inserted");
              }
            }
          );
        }
      });
    }
  });
});

app.get("/notices/:username", (req, res) => {
  let sql = `SELECT notices.id, notices.title, notices.information, notification_user.username FROM notices JOIN notification_user ON notices.id = notification_user.notification_id WHERE notification_user.username = '${req.params.username}' AND notification_user.read_status= '0'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get(
  "/notice_detail/:id/:faculty/:value1/:value2",
  (req, res) => {
    let sql = `SELECT * FROM notice where id=${req.params.id};
              select * from notice where faculty_id = ${req.params.faculty} and status='${req.params.value1}' or
               faculty_id = ${req.params.faculty} and status='${req.params.value2}' order by id desc limit 6`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  }
);

app.put("/notification/:id/:username", (req, res) => {
  console.log(req.params.id);
  console.log(req.params.username);
  let sql = `UPDATE notification_user SET read_status = '1' WHERE notification_id = ${req.params.id} AND username=${req.params.username}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have updated successfuly");
  });
});
app.put("/message/:id", (req, res) => {
  console.log(req.params.id);

  let sql = `UPDATE chat_messages SET message = '${req.body.message}' WHERE id = ${req.params.id} `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have updated successfuly");
  });
});
app.put("/updateDescription/:id", (req, res) => {
  console.log(req.params.id);

  let sql = `UPDATE project SET description='${req.body.description}' WHERE id = ${req.params.id} `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have updated successfuly");
  });
});
app.put("/updateBest/:id", (req, res) => {
  console.log(req.params.id);

  let sql = `UPDATE ${req.body.table} SET ${req.body.type}='${req.body.value}' WHERE id = ${req.params.id} `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have updated successfuly");
  });
});
app.delete("/message/:id", (req, res) => {
  console.log(req.params.id);

  let sql = `delete from chat_messages  WHERE id = ${req.params.id} `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have deleted successfuly");
  });
});
app.delete("/deleteStudents/:id", (req, res) => {
  console.log(req.params.id);

  let sql = `delete from students  WHERE id = ${req.params.id} `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have deleted successfuly");
  });
});
//girma end
//nahom start
app.post(
  "/uploadProposal/:id/:folder",
  upload.single("file"),
  async (req, res) => {
    const file = req.file;
    const filePath = file.path;
    console.log("proposal");

    try {
      const data = await PDFParser(filePath);
      const content = data.text;
      const vector = calculateVector(content);
      db.query("SELECT vector, url FROM users_file", (err, results) => {
        if (err) {
          console.error("Error querying database:", err);
          return res.status(500).json({ message: "Error querying database" });
        }

        const similarFiles = [];

        for (const result of results) {
          const existingVector = JSON.parse(result.vector);
          const existingUrl = result.url;
          const existingId = result.id;
          const similarity = calculateCosineSimilarity(vector, existingVector);
          if (checkPlagiarism(similarity)) {
            similarFiles.push({
              url: existingUrl,
              similarity: similarity * 100,
            });
          }
        }
        const newFile = { vector: JSON.stringify(vector), url: file.filename };

        var file_src = req.file.filename;
        var url = `http://localhost:5000/proposal/${file_src}`;
        console.log(similarFiles);
        let sql = `UPDATE project SET proposal_url= '${url}',status='Progress' WHERE id= ${req.params.id}`;
        db.query(sql, (err, result) => {
          if (err) throw err;
          db.query(
            `SELECT url from users_file  where url='${file_src}'`,
            (err, result) => {
              if (err) throw err;
              if (result.length>0) {

                res.send({ msg: false, file: file_src, similarFiles });
                console.log("okkkk")
              } 
              
              else {
                db.query("INSERT INTO users_file  SET ?", newFile, (err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.send({ msg: false, file: file_src, similarFiles });
                  }
                });
              }
            }
          );
        });
      });
    } catch (error) {
      console.error("Error parsing PDF:", error);
      res.status(500).json({ message: "Error parsing PDF" });
    }
  }
);
app.post("/upload/:id/:folder", upload.single("file"), async (req, res) => {
  console.log("final");
  const file = req.file;
  const filePath = file.path;

  try {
    const data = await PDFParser(filePath);
    const content = data.text;
    const vector = calculateVector(content);
    db.query("SELECT vector, url FROM users_file", (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ message: "Error querying database" });
      }

      const similarFiles = [];

      for (const result of results) {
        const existingVector = JSON.parse(result.vector);
        const existingUrl = result.url;
        const existingId = result.id;
        const similarity = calculateCosineSimilarity(vector, existingVector);
        if (checkPlagiarism(similarity)) {
          similarFiles.push({ url: existingUrl, similarity: similarity * 100 });
        }
      }

      const newFile = { vector: JSON.stringify(vector), url: file.filename };

      var file_src = req.file.filename;
      var url = `http://localhost:5000/final/${file_src}`;
      console.log(url);
      let sql = `UPDATE project SET url= '${url}',status='Completed' WHERE id= ${req.params.id}`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        db.query(
          `SELECT url from users_file  where url='${file_src}'`,
          (err, result) => {
            if (err) throw err;
            if (result) {
              
              res.send({ msg: false, file: file_src, similarFiles });
            } else {
              db.query("INSERT INTO users_file  SET ?", newFile, (err) => {
                if (err) {
                  console.log("duplicate Entry");
                } else {
                  res.send({ msg: false, file: file_src, similarFiles });
                }
              });
            }
          }
        );
      });
    });
  } catch (error) {
    console.error("Error parsing PDF:", error);
    res.status(500).json({ message: "Error parsing PDF" });
  }
});
app.get("/remove/:id/:directory/:name", (req, res) => {

 
  const fileName = req.params.name;
  const directoryPath = `./public/${req.params.directory}/`;
  let sql = `SELECT url from users_file where url  like '%${fileName}%'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      if(req.params.directory=='final'){
        let sql = `update project set url='' where id  = ${req.params.id}`;
        db.query(sql,(er,result1)=>{
        if(err) throw err
        res.send({ rem: true });
        console.log(result1)
        })
      }
      if(req.params.directory=='proposal'){
        let sql = `update project set proposal_url='' where id  = ${req.params.id}`;
        db.query(sql,(er,result1)=>{
        if(err) throw err
        res.send({ rem: true });
        console.log(result1)
        })
      }
    } 
    else {
      fs.unlink(directoryPath + fileName, (err) => {
        if (err) {
          console.log(err);
        }
        
        else{
          let sql = `update  project set url=''  where id=${req.params.id}`;
          db.query(sql, (err, result) => {
            if (err) {
              console.log(err);

            }
          if(result){
            console.log()
              let sql1 = `delete from users_file  where url like '%${req.params.name}%'`;
              db.query(sql1, (err, result) => {
                if (err) throw err;
                res.send({ rem: true });
                console.log("okkkk")
              });

            }
         
          });

        }

       
      });
    }
  });
});
app.get("/search_title/:id/:title", (req, res) => {
  let sql = `SELECT * from allproject where (title like '%${req.params.title}%' or advisor like '%${req.params.title}%' or year(date) like '%${req.params.title}%') and department_id=${req.params.id}  order by date `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
    console.log(result);
  });
});
app.get("/show_department/:id", (req, res) => {
  let sql = `SELECT departments.department_name FROM departments JOIN project WHERE departments.department_id = project.department_id })`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
    console.log(result);
  });
});

app.get("/project_titles/:id", (req, res) => {
  let sql = `SELECT * FROM allproject WHERE department_id=${req.params.id} and status='Uploaded'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});

app.get("/project_detail/:id", (req, res) => {
  let sql = `SELECT project.id,project.student1,project.student2,project.student3,project.student4,project.title,project.description,project.url,project.proposal_url,project.date,project.status,project.faculty_id,project.department_id,project.chair_id,staff_member.first_name,staff_member.second_name,staff_member.last_name FROM project left join staff_member on project.advisor=staff_member.id WHERE project.id=${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});

app.get("/detail/:id", (req, res) => {
  let sql = `SELECT * FROM allproject where id=${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});

app.get("/faculties", (req, res) => {
  let sql = "SELECT * FROM faculties";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get("/departments/:id", (req, res) => {
  let sql = `SELECT * FROM departments where faculty_id=${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log("something went wrong");
    }
    res.send(result);
  });
});
//nahom end
//admin
app.get("/adminDepartmentList", (req, res) => {
  let sql = `SELECT departments.department_id,departments.department_name,staff_member.first_name,staff_member.second_name,
            staff_member.last_name, faculties.faculty_name FROM departments
            left join staff_member on departments.department_head=staff_member.id
            left join faculties on departments.faculty_id = faculties.faculty_id`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get("/adminDepartmentListInfo/:id", (req, res) => {
  let sql = `SELECT departments.department_id,departments.department_name,staff_member.first_name,staff_member.second_name,
            staff_member.last_name, faculties.faculty_name FROM departments
            left join staff_member on departments.department_head=staff_member.id
            left join faculties on departments.faculty_id = faculties.faculty_id
            where departments.department_id=${req.params.id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get("/DepDepartmentListInfo/:type/:id", (req, res) => {
  let sql = `SELECT departments.department_id,departments.department_name,staff_member.first_name,staff_member.second_name,
            staff_member.last_name, faculties.faculty_name FROM departments
            left join staff_member on departments.department_head=staff_member.id
            left join faculties on departments.faculty_id = faculties.faculty_id
            where departments.${req.params.type}=${req.params.id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get("/adminChairList", (req, res) => {
  let sql = `SELECT chairs.name, chairs.id,chairs.chair_person,staff_member.first_name,staff_member.second_name,
             staff_member.last_name,departments.department_name FROM chairs
             left join staff_member on chairs.chair_person=staff_member.id
             left join departments on chairs.department_id=departments.department_id`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get("/DepChairList/:type/:id", (req, res) => {
  let sql = `SELECT chairs.name, chairs.id,chairs.chair_person,staff_member.first_name,staff_member.second_name,
             staff_member.last_name,departments.department_name FROM chairs
             left join staff_member on chairs.chair_person=staff_member.id
             left join departments on chairs.department_id=departments.department_id
             where chairs.${req.params.type}=${req.params.id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get("/adminChairListInfo/:id", (req, res) => {
  let sql = `SELECT chairs.name, chairs.id,chairs.chair_person,staff_member.first_name,staff_member.second_name,
             staff_member.last_name,departments.department_name,faculties.faculty_name FROM chairs
             left join staff_member on chairs.chair_person=staff_member.id
             left join faculties on chairs.faculty_id=faculties.faculty_id
             left join departments on chairs.department_id=departments.department_id
             where chairs.id=${req.params.id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get("/adminFacultyList", (req, res) => {
  let sql = `SELECT faculties.faculty_name,faculties.faculty_id,staff_member.first_name,staff_member.second_name,
             staff_member.last_name FROM faculties
             left join staff_member on faculties.faculty_din=staff_member.id`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get("/BestProjectNumber/:type/:value/:year", (req, res) => {
  let sql = `select * from project where date = '${req.params.year}' and ${req.params.type}=${req.params.value} and best_project='Yes';
  select * from repository where status='Completed' and ${req.params.type}=${req.params.value} and best_project='Yes';`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
app.get("/adminFacultyListInfo/:id", (req, res) => {
  let sql = `SELECT faculties.faculty_name,faculties.faculty_id,staff_member.first_name,staff_member.second_name,
             staff_member.last_name FROM faculties
             left join staff_member on faculties.faculty_din=staff_member.id
             where faculties.faculty_id=${req.params.id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});

app.delete("/deleteFaculty/:id", (req, res) => {
  console.log(req.params.id);
  db.query(
    `SELECT faculty_id FROM staff_member WHERE faculty_id=${req.params.id}
    union select faculty_id from departments where faculty_id=${req.params.id}
    union select faculty_id from chairs where faculty_id=${req.params.id};`,
    (err, result) => {
      if (err) throw err;
      if (result.length) {
        console.log(result.length);
        res.send({
          msg: false,
        });
      } else {
        let sql = `delete from faculties  WHERE faculty_id = ${req.params.id} `;
        db.query(sql, (err1, result1) => {
          console.log(result1);
          res.send({
            msg: true,
          });
        });
      }
    }
  );
});
app.delete("/deleteDepartment/:id", (req, res) => {
  console.log(req.params.id);
  db.query(
    `SELECT department_id FROM staff_member WHERE department_id=${req.params.id}
    union select department_id from chairs where department_id=${req.params.id};`,
    (err, result) => {
      if (err) throw err;
      if (result.length) {
        console.log(result.length);
        res.send({
          msg: false,
        });
      } else {
        let sql = `delete from departments  WHERE department_id = ${req.params.id} `;
        db.query(sql, (err1, result1) => {
          console.log(result1);
          res.send({
            msg: true,
          });
        });
      }
    }
  );
});
app.delete("/deleteChair/:id", (req, res) => {
  console.log(req.params.id);
  db.query(
    `SELECT chair_id FROM staff_member WHERE chair_id=${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      if (result.length) {
        console.log(result.length);
        res.send({
          msg: false,
        });
      } else {
        let sql = `delete from chairs  WHERE id = ${req.params.id} `;
        db.query(sql, (err1, result1) => {
          console.log(result1);
          res.send({
            msg: true,
          });
        });
      }
    }
  );
});
///////
app.post(
  "/repoChair",
  upload.fields([
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("welcome");
    const title = req.body.title;
    const advisor = req.body.advisor;
    const date = req.body.date;
    const description = req.body.description;
    const faculty = req.body.faculty_id;
    const chair = req.body.chair_id;
    const status = req.body.status;
    const student1 = req.body.student1;
    const student2 = req.body.student2;
    const student3 = req.body.student3;
    const student4 = req.body.student4;
    const best = req.body.best_project;
    const department = req.body.department_id;
    const file1 = req.files["file1"][0];
    const file2 = req.files["file2"][0];
    const file1Name = file1.originalname;
    const file2Name = file2.originalname;
    console.log(file1Name);
    console.log(description);
    var url = "http://localhost:5000/proposal/" + file1Name;
    var url2 = "http://localhost:5000/final/" + file2Name;
    var sql =
      "INSERT INTO repository (title, description, advisor,student1,student2,student4, proposal_url,student3,url,date,faculty_id,department_id,chair_id,status,best_project) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(
      sql,
      [
        title,
        description,
        advisor,
        student1,
        student2,
        student4,
        url,
        student3,
        url2,
        date,
        faculty,
        department,
        chair,
        status,
        best,
      ],
      (err, result) => {
        if (err) throw err;

        console.log(result);
      }
    );
  }
);

app.post(
  "/repo",
  upload.fields([
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("welcome");
    const title = req.body.title;
    const advisor = req.body.advisor;
    const date = req.body.date;
    const description = req.body.description;
    const faculty = req.body.faculty_id;
    const status = req.body.status;
    const student1 = req.body.student1;
    const student2 = req.body.student2;
    const student3 = req.body.student3;
    const student4 = req.body.student4;
    const best = req.body.best_project;
    const department = req.body.department_id;
    const file1 = req.files["file1"][0];
    const file2 = req.files["file2"][0];
    const file1Name = file1.originalname;
    const file2Name = file2.originalname;
    console.log(file1Name);
    console.log(description);
    var url = "http://localhost:5000/proposal/" + file1Name;
    var url2 = "http://localhost:5000/final/" + file2Name;
    var sql =
      "INSERT INTO repository (title, description, advisor,student1,student2,student4, proposal_url,student3,url,date,faculty_id,department_id,status,best_project) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(
      sql,
      [
        title,
        description,
        advisor,
        student1,
        student2,
        student4,
        url,
        student3,
        url2,
        date,
        faculty,
        department,
        status,
        best,
      ],
      (err, result) => {
        if (err) throw err;

        console.log(result);
      }
    );
  }
);

app.post("/AppLastNotice/:user", (req, res) => {
  const query = `select * from notification_user where username='${req.params.user}'`;
  db.query(query, (err, result) => {
    if (err) throw err;
    if (result.length) {
      const query1 = `UPDATE notification_user set lastNoticeId = ${req.body.lastNoticeId} where username='${req.params.user}'`;
      db.query(query1, (err1, result1) => {
        if (err1) {
          console.log("Error executing query:");
        }
        console.log("updated successfully.");
      });
    } else {
      const query2 = `insert into notification_user(username,lastNoticeId) values(${req.params.user},${req.body.lastNoticeId})`;
      db.query(query2, (err2, result2) => {
        if (err2) throw err2;
        console.log("updated successfully.");
      });
    }
  });
});
app.post("/AppLastChat/:user", (req, res) => {
  const query = `select * from notification_user where username='${req.params.user}'`;
  db.query(query, (err, result) => {
    if (err) throw err;
    if (result.length) {
      const query1 = `UPDATE notification_user set lastMessageId = ${req.body.lastMessageId} where username='${req.params.user}'`;
      db.query(query1, (err1, result1) => {
        if (err1) {
          console.log("Error executing query:");
        }
        console.log("updated successfully.");
      });
    } else {
      const query2 = `insert into notification_user(username,lastMessageId) values(${req.params.user},${req.body.lastMessageId})`;
      db.query(query2, (err2, result2) => {
        if (err2) throw err2;
        console.log("updated successfully.");
      });
    }
  });
});
app.get("/AppChat/:user/:group", (req, res) => {
  const query = `SELECT lastMessageId FROM notification_user where username=${req.params.user}`;
  db.query(query, (error, results) => {
    console.log(results);

    if (error) {
      console.log("Error executing query:", error);
    }
    if (results.length && results[0].lastMessageId !== null) {
      const lastId = results[0].lastMessageId;
      console.log(lastId);
      const ChatQuery = `SELECT * FROM chat_messages WHERE sender_id != ${req.params.user} and id >= ${lastId} and group_id=${req.params.group}`;
      db.query(ChatQuery, (err, chatResult) => {
        if (err) {
          console.log(err);
          res.send({
            msg: false,
          });
        } else {
          console.log(chatResult);
          res.send(chatResult);
        }
      });
    } else {
      const chat = `SELECT * FROM chat_messages WHERE sender_id != ${req.params.user} and id > 0 and group_id=${req.params.group}`;
      db.query(chat, (err, chatResult) => {
        if (err) {
          console.log(err);
          res.send({
            msg: false,
          });
        } else {
          res.send(chatResult);
        }
      });
    }
  });
});
app.get("/AppNotice/:status/:user/:faculty", (req, res) => {
  const query = `SELECT lastNoticeId FROM notification_user where username=${req.params.user}`;
  db.query(query, (error, results) => {
    console.log(results);
    if (error) {
      console.log("Error executing query:", error);
    }
    if (results.length && results[0].lastNoticeId !== null) {
      const lastId = results[0].lastNoticeId;
      console.log(lastId);
      const noticesQuery = `SELECT * FROM notice WHERE (status='${req.params.status}' or status='all') and id >= ${lastId} and faculty_id=${req.params.faculty}`;
      db.query(noticesQuery, (err, noticesResult) => {
        if (err) {
          console.log(err);
          res.send({
            msg: false,
          });
        } else {
          console.log(noticesResult);
          res.send(noticesResult);
        }
      });
    } else {
      const notices = `SELECT * FROM notice WHERE (status='${req.params.status}' or status='all') and id > 0 and faculty_id=${req.params.faculty}`;
      db.query(notices, (err, noticesResult) => {
        if (err) {
          console.log(err);
          res.send({
            msg: false,
          });
        } else {
          res.send(noticesResult);
        }
      });
    }
  });
});

app.post("/allProjects", (req, res) => {
  const query = req.body.query;
  let sql = "";

  if (query == null) {
    sql = `select * from allproject where status='Uploaded'`;
  } else {
    sql = `SELECT * FROM allproject WHERE status='Uploaded' and ( title LIKE  '%${query}%' or YEAR(date) LIKE '%${query}%' or advisor LIKE '%${query}%') order by title `;
  }
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
    console.log(query);
  });
});
app.post("/getProjects/:year", (req, res) => {
  console.log(req.body.department);
  let sql = `SELECT * FROM allproject WHERE `;
  if (req.body.query != null && req.body.department == null) {
    sql = `${sql} YEAR(date) LIKE '%${req.params.year}%' and title LIKE '%${req.body.query}%'  `;
  }
  if (req.body.query == null && req.body.department == null) {
    sql = `${sql} YEAR(date) LIKE '%${req.params.year}%'  `;
  }

  if (req.body.department != null && req.body.query == null) {
    sql = `SELECT * FROM project WHERE YEAR(date) LIKE '%${req.params.year}%'  and department_id LIKE '%${req.body.department}%'   `;
  }
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
    console.log(sql);
  });
});
app.get("/acadamic", (req, res) => {
  const query = `
    SELECT f.faculty_id, f.faculty_name, d.department_id, d.department_name
    FROM faculties f
    LEFT JOIN departments d ON d.faculty_id = f.faculty_id
    ORDER BY f.faculty_id
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data" });
    } else {
      const faculties = [];

      results.forEach((row) => {
        const faculty = faculties.find((f) => f.faculty_id === row.faculty_id);
        if (faculty) {
          faculty.departments.push({
            department_id: row.department_id,
            department_name: row.department_name,
          });
        } else {
          const newFaculty = {
            faculty_id: row.faculty_id,
            faculty_name: row.faculty_name,
            departments: [
              {
                department_id: row.department_id,
                department_name: row.department_name,
              },
            ],
          };
          faculties.push(newFaculty);
        }
      });

      res.json(faculties);
    }
  });
});
app.get("/departments", (req, res) => {
  let sql = `SELECT * FROM departments `;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
app.get("/aaa/:id", (req, res) => {
  let sql = `SELECT * FROM departments where department_id=${req.params.id} `;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
    console.log(result);
  });
});
app.get("/bestProjects", (req, res) => {
  let sql = `SELECT * FROM allproject where best_project='yes' limit 5 `;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
    console.log(result);
  });
});

//create connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0',() => console.log(`Server is running at port ${PORT}`));
