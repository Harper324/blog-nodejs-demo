const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "test",
  database: "my_blogs"
});

//   const sql = "CREATE TABLE users (id INT(10), user_name VARCHAR(100), password VARCHAR(100))";

//   con.query(sql, function(err) {
//       if(err) throw err;
//       console.log("Table created!");
//   });

//   const insertSql = "INSERT INTO users (user_name, password) VALUES ('aaa','111')";
//   con.query(insertSql, err=> {
//       if(err) throw err;
//       console.log("Insert success!");
//   })

// const autoIncreamentSql = "ALTER TABLE users MODIFY COLUMN id INT AUTO_INCREMENT";
// con.query(autoIncreamentSql,err=>{
//     if(err) throw err;
// })

// const insertMultipleSql = "INSERT INTO users (user_name, password) VALUES ? ";
// const values = [
//     ['bbb','222'],
//     ['bbb','222'],
//     ['bbb','222'],
//     ['bbb','222'],
//     ['bbb','222'],
//     ['bbb','222']
// ];
// con.query(insertMultipleSql,[values],(err,result)=>{
//     if(err) throw err;
//     console.log("Records have been inserted ",result.affectedRows);
// })

// const selectSql = "SELECT * FROM users";
// con.query(selectSql,(err,result,fields)=>{
//     if(err) throw err;
//     console.log(result);
// })

addUser = user => {
  const { userName, password } = user;
  const insertUserSql = `INSERT INTO users (id, user_name, password) VALUES (NULL, ${userName}, ${password})`;
  con.query(insertUserSql, (err, result) => {
    if (err) throw err;
    console.log(result.affectedRows, "records have been inserted!");
  });
};

function addPost(post) {
  const { title, text, userId } = post;
  const insertPostSql =
    "INSERT INTO posts (id, title, text, user_id, time) VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP)";
  con.query(insertPostSql, [title, text, userId], (err, result) => {
    if (err) throw err;
    console.log(result.affectedRows, "records have been inserted!");
  });
}

getUser = user => {
  const { userName, password } = user;
  const queryUserSql =
    "SELECT user_id FROM users WHERE user_name = ? AND password = ?";
  con.query(queryUserSql, [userName, password], (err, result, fields) => {
    if (err) throw err;
    console.log(result, "result");
    console.log(fields, "fields");
  });
};

// use callback to handle async function
getUserPosts2 = (userId, callback) => {
  const queryUserpostsSql = "SELECT * FROM posts WHERE user_id = ?";
  const result = con.query(
    queryUserpostsSql,
    [userId],
    (err, result, fields) => {
      if (err) throw err;
      var row = JSON.parse(JSON.stringify(result));
      return callback(row);
    }
  );
};

// use Promise to handle async function
getUserPosts = userId => {
  const queryUserpostsSql = "SELECT * FROM posts WHERE user_id = ?";
  return new Promise(function(reslove, reject) {
    con.query(queryUserpostsSql, [userId], function(err, result, fields) {
      if (err) throw err;
      if (result === undefined) {
        reject(new Error("Can not find it"));
      } else {
        reslove(JSON.stringify(result));
      }
    });
  });
};

getAllPosts = () => {
  const queryAllPostsSql = "SELECT * FROM posts";
  return new Promise((reslove, reject) => {
    con.query(queryAllPostsSql, (err, result, fields) => {
      if (err) throw err;
      console.log(JSON.stringify(result,'result from db---------'));
      if (result === undefined) {
        reject(new Error("Can not find posts!"));
      } else {
        reslove(JSON.stringify(result));
      }
    });
  });
};

module.exports = {
  addUser: this.addUser,
  addPost: addPost,
  getUser: getUser,
  getUserPosts: getUserPosts,
  getAllPosts: getAllPosts
};
