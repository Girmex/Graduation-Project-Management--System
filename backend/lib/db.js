const mysql= require( "mysql");
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'pms',
  password: '',
  multipleStatements:true
});

db.connect( (err) =>{
  if (err) {
      return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
})
module.exports= db;