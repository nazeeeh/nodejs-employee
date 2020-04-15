const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const myDbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeeDB'
});

myDbConnection.connect((err) =>{
    if(!err){
        console.log("Database connected successfully")
    } else {
        console.log("database connection failed", err)
    }
});

//Get all employees
app.get("/employees", (req, res) => {
    myDbConnection.query("SELECT * FROM employee", (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }else {
            console.log(err);
        }
    });
});

//Get an employee
app.get("/employees/:id", (req, res) => {
    myDbConnection.query("SELECT * FROM employee WHERE employee_id = ?",[req.params.id], (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }else {
            console.log(err);
        }
    });
});

//Delete an employee
app.delete("/employees/:id", (req, res) => {
    myDbConnection.query("DELETE FROM employee WHERE employee_id = ?",[req.params.id], (err, rows, fields) => {
        if(!err){
            res.send("Deleted Successsfully");
        }else {
            console.log(err);
        }
    });
});

//INSERT a new employee
app.post("/employee", (req, res) => {
    // const {name, employee_code, salary} = ;
    let name = req.body.name;
    let employee_code = req.body.employee_code;
    let salary = req.body.salary;
    const data = {name, employee_code, salary};

    myDbConnection.query("INSERT INTO employee SET ?", data, (err, rows, fields) => {
        if(!err){
            res.send("employee added");
        }else {
            console.log(err);
        }
    });
});


const port = process.env.PORT || 2000;
app.listen(port, ()=>{
    console.log("server is up at port :" + port);
})
