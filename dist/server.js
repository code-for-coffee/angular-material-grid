'use strict'

let express = require('express'),
    app     = express()


app.use(express.static(__dirname + '/public'))
app.get('/?', (req, res, next) => {
  res.sendFile(__dirname + '/public/index.html')
});
console.log('Server intialized; about to listen...')

let server = app.listen(process.env.PORT || 9000, () => {
  console.log('Server listening at http://locahost:' + server.address().port)
})
