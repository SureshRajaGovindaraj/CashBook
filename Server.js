var mysql = require('mysql2');

var database_connection ={
  host: "localhost",
  user: "root",
  password: "raja",
  database:"finance"
}

// database_connection.query('select distinct CusName , (sum(credit) - sum(debit)) as Balance_amount from cashbook where CusName="Raja" group by CusName ;',(err,data)=>{
// if(err)
//     {
//        return  console.log("error found in query")
//     }
//     return console.log(data)

// })

module.exports = database_connection