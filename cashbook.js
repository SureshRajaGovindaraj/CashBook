var express = require('express')
var app = express()
const bodyParser = require('body-parser');
var mysql = require('mysql2');
const database_connection = require('./Server');
app.use(bodyParser.json());

var database = mysql.createConnection(database_connection)

var create_table_query = "create table cashbook (Date datetime primary key, CusName varchar(20) not null, credit integer, debit integer, remarks varchar(50));"
const data = "Customer Details table created already"

database.query(create_table_query, data, (err) => {
    if (!err) {
        console.log("New table ==> Customer Details table created")
        return;
    }
    console.log(data)
})


// var book = require('./book.js')

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/cashbook.html')
})

app.get('/getallcash', function (req, res) {

  database.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }

    // Define the SQL query with placeholders
    const query = 'select * from cashbook;'

    // Execute the query
    database.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return;
      }
      res.send(results)
    })
  })

})

app.get('/getcashdata/:custname', function (req, res) {
  const data = req.params.custname
  const query = 'SELECT date,t.CusName, t.credit, t.debit, (SELECT SUM(tt.credit - tt.debit) FROM cashbook tt WHERE tt.CusName = t.CusName AND tt.Date <= t.Date) AS Total FROM cashbook t where t.CusName=? ORDER BY t.CusName, t.Date;'

  database.query(query, data, function (err, results) {
    if (err) {
      console.log(err)
    }
    res.send(results)
  })
})



app.post('/submit', (req, res) => {
  // Define the data to be passed to the query
  const data_body = req.body;
  var data = []
  // Define the SQL query with placeholders
  const query = 'insert into cashbook (date,CusName,credit,debit) values (CURRENT_TIMESTAMP,?,?,?);'
  data = [data_body.CusName, data_body.credit, data_body.debit]

  // Execute the query
  database.query(query, data, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    res.send('data send successfully :)')
  })
})



app.listen(2000)
