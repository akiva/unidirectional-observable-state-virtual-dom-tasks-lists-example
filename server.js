var http = require('http')
var ecstatic = require('ecstatic')(__dirname + '/build')

var browserify = require('browserify')
var server = http.createServer(function (req, res) {
  if (req.url === '/bundle.js') {
    res.writeHead(200, { 'Content-Type': 'application/javascript' })
    browserify(__dirname + '/index.js', { debug: true })
      .transform('babelify', { presets: [ 'es2015' ] })
      .bundle()
      .pipe(res)
  }
  else ecstatic(req, res)
})

server.listen(8000, function () {
  console.log('Listening on port ' + this.address().port)
})
