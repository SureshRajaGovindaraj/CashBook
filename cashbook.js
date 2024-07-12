var express = require('express')
var app = express()
const bodyParser = require('body-parser');
var mysql = require('mysql2')
app.use(bodyParser.json());

var database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "raja",
  database: "finance"
}); // assume you have a database connection setup

// var book = require('./book.js')

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/cashbook.html')
})

app.get('/input/:data', function (req, res) {

  var data = req.params.data
  console.log(data)
  res.send('data send => ' + data)
  res.end()
})

app.post('/cashbook', function (req, res) {

  var body = []
  req.on("data", (chunk) => {
    body.push(chunk)
  })

  req.on('close', () => {
    var parsedatabaseody = Buffer.concat(body).toString();
    console.log(parsedatabaseody.toString())
    res.send(parsedatabaseody)
    res.end()
  })
})


app.post('/submit', (req, res) => {
  database.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
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

});

app.listen(2000)
