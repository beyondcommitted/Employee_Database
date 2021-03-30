const connection = require("./db");

connection.query("SELECT * FROM employees")
.then(function(data){
    console.table(data);
})
    .catch(function (err) {
        console.log(err)
    })
connection.query("SELECT * FROM emp_role")
.then(function(data){
    console.table(data);
})
    .catch(function (err) {
        console.log(err)
    })
connection.query("SELECT * FROM department")
.then(function(data){
    console.table(data);
})
    .catch(function (err) {
        console.log(err)
    })
