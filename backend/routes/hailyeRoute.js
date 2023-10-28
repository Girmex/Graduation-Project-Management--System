const express = require("express");
const router = express.Router();
const db = require("../lib/db.js");
const userMiddleware = require("../middleware/users.js");
const userRolecheck = require("../middleware/rolevalidation.js");
router.put("/updateStudentGroup/", (req, res) => {
  const data = req.body;
  let sql = `UPDATE students SET groups=${req.body.groupId} WHERE id= '${req.body.id1}' or id= '${req.body.id2}' or id= '${req.body.id3}' or id= '${req.body.id4}' `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have updated successfuly");
  });
});
router.post("/addGroup/", (req, res) => {
  const data = req.body;
  let sql = `insert into groups SET ? `;
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have inserted successfuly");
  });
});
router.post("/addStudent/:table", (req, res) => {
  const data = req.body;
  const table = req.params.table;
  let sql = `insert into ${table} SET ? `;
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have inserted successfuly");
  });
});
router.post("/addStaffMember", (req, res) => {
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
              `INSERT INTO staff_member (faculty_id,department_id,chair_id,first_name,second_name,last_name,gender,id,username, password, position,qualification) 
              VALUES ( '${req.body.faculty_id}','${req.body.department_id}','${
                req.body.chair_id
              }','${req.body.first_name}','${req.body.second_name}','${
                req.body.last_name
              }','${req.body.gender}','${req.body.id}','${
                req.body.username
              }', ${db.escape(hash)},7,'msc')`,
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

router.post("/addDepartment/", (req, res) => {
  const facultyId = req.params.id;
  const data = req.body;
  let sql = `insert into departments SET ? `;
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have inserted successfuly");
  });
});
router.get("/listLength/:tableName/:type/:value/:type2/:value2", (req, res) => {
  const table = req.params.tableName;
  const type = req.params.type;
  const val = req.params.value;
  const type2 = req.params.type2;
  const val2 = req.params.value2;

  let sql = `SELECT * FROM ${table} where ${type}="${val}";
           SELECT * FROM ${table} where ${type}="${val}" and ${type2}="${val2}";`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
router.get("/facultyList/:faculty", (req, res) => {
  const faculty_Id = req.params.faculty;

  let sql = `SELECT * FROM faculties where faculty_id="${faculty_Id}" `;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
router.get("/staffInfo/:id", (req, res) => {
  const Id = req.params.id;

  let sql = `select staff_member.first_name, staff_member.second_name, staff_member.last_name ,
           staff_member.id, staff_member.gender, staff_member.username, staff_member.password,
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
router.get("/departmentList/:faculty", (req, res) => {
  const faculty_Id = req.params.faculty;

  let sql = `SELECT * FROM departments where faculty_id="${faculty_Id}" `;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});

router.get("/chairList/:type/:value", (req, res) => {
  const type = req.params.type;
  const val = req.params.value;

  let sql = `SELECT * FROM chairs where ${type}="${val}"`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});
router.get("/roleList", (req, res) => {
  let sql = `SELECT * FROM role where role_name !="student"`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("data fetched");
    res.json(result);
  });
});

router.get(
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
            groups.group_id from groups left join staff_member on groups.advisor= staff_member.id 
            where groups.${type}="${val}" AND groups.group_id LIKE "%${search}%" OR staff_member.${type}="${val}" AND staff_member.first_name LIKE "%${search}%" ORDER BY groups.group_id `;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("data fetched");
      res.json(result);
    });
  }
);

router.get(
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
            groups.group_id from groups left join staff_member on groups.advisor= staff_member.id 
            where groups.${type1}='${val}' ORDER BY groups.group_id limit ${offset},6;
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
router.get("/update_chairPerson/:id/:name", (req, res) => {
  const student_id = req.params.id;
  const chair_name = req.params.name;
  let sql2 = `UPDATE chairs set chairPerson=(select advisor_id from staff_member where first_name="${chair_name}") where id="${student_id}"`;
  db.query(sql2, (err, result) => {
    if (err) throw console.log("you have insert unknown advisor");
    console.log(result);
    res.json(result);
  });
});
router.get("/updatenotice/:id", (req, res) => {
  let tit = "abcde";
  let sql = `UPDATE notice SET title = '${tit}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have updated successfuly");
  });
});
router.get("/updateProjectTitle/:id/:title", (req, res) => {
  let tit = req.params.title;
  let sql = `UPDATE selected_project SET title = '${tit}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("You have updated successfuly");
  });
});
  module.exports = router;