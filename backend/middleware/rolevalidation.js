
const db = require("../lib/db.js");
const checkRole=(role) => {
    return (req, res, next) =>{
      const username = req.params.username;
      const sql = `
        SELECT username
        FROM users
        WHERE username='${username}'
      `;
      db.query(sql, (err, results) => {
        if (err) {
          return res.status(500).send('Internal server error');
        }
        const userRole = results[0].username;
        if (userRole !== role) {
          return res.status(403).send('Forbidden');
        }
        next();
      });
    };
}
  module.exports = {
    checkRole: checkRole
  };
  