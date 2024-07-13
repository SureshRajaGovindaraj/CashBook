var mysql = require('mysql2')
var express = require('express')
const { database_connection } = require('./Server')
var app = express()

var database = mysql.createConnection(database_connection); // assume you have a database connection setup

var create_table_query = "create table CustomerDetails (CusName varchar(20) primary key not null , Contact long not null, Address varchar(100) , SecurityName varchar(30) , SecurityLocation varchar(50) );"
const data = "Customer Details table created already"

database.query(create_table_query, data, (err) => {
    if (!err) {
        console.log("Customer Details table created")
        return;
    }
    console.log(data)
})

app.get("/getallCustomers", (req,res)=>{
    
    res.send("api working")
    console.log("api working")
})

