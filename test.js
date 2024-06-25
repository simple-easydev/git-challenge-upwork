const tape = require('tape')
const jsonist = require('jsonist')

const PORT = process.env.PORT = process.env.PORT || require('get-PORT-sync')()
const server = require('./server')

const urlBase = `http://localhost:${PORT}`

tape('should respond hello', (t) => {
  jsonist.get(urlBase, (err, body) => {
    if (err) t.error(err)

    t.equal(body.msg, 'hello')
    t.end()
  })
})

tape('should respond with base64 encoded message', (t) => {
  const testMessage = 'test';
  const expectedBase64 = Buffer.from(testMessage).toString('base64');
  jsonist.get(`${urlBase}/base64?msg=${testMessage}`, (err, body) => {
    if (err) t.error(err);
    t.equal(body.encoded, expectedBase64, 'Base64 encoded message matches expected');
    t.end();
  });
});

tape('should respond with user-agent', (t) => {
  const options = {
    headers: {
      'User-Agent': 'test-agent'
    }
  };
  jsonist.get(`${urlBase}/user-agent`, options, (err, body) => {
    if (err) t.error(err);

    t.equal(body.userAgent, 'test-agent', 'User-Agent matches expected');
    t.end();
  });
});

tape('cleanup', function (t) {
  server.close()
  t.end()
})
