const http = require('http')
const url = require('url');

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  if (req.url === '/') return respondHello(req, res)
    if (req.url.startsWith('/base64')) return respondBase64(req, res); // Add base64 endpoint.

  res.end()
})

function respondHello (req, res) {
  res.end(JSON.stringify({ msg: 'hello' }))
}

function respondBase64(req, res) {
  const query = url.parse(req.url, true).query;
  const message = query.msg || ''; 
  const base64Encoded = Buffer.from(message).toString('base64');
  res.end(JSON.stringify({ encoded: base64Encoded }));
}


server.listen(PORT)
console.log(`Server listening on port ${PORT}`)

if (require.main !== module) module.exports = server
