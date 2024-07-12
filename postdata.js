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
  