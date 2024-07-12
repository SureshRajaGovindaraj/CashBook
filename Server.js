var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "raja",
  database:"finance"
});

con.query('select distinct CusName , (sum(credit) - sum(debit)) as Balance_amount from cashbook where CusName="Raja" group by CusName ;',(err,data)=>{
if(err)
    {
       return  console.log("error found in query")
    }
    return console.log(data)

})

