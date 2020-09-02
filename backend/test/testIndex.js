const assert = require('assert');
const fetch = require("node-fetch");
const app = require('../index').app;
const port = 3000;
const urlBase = `http://localhost:${port}`;
let server; 

describe("get '/'", function () {
  before(done => {
    server = app.listen(port, done);
  });
  it('should return a string', async function () {
    const desiredString = 'Go to /new-game/:numPlayer for the game!';
    return fetch(urlBase)
      .then(response => response.text())
      .then((data) => assert.equal(data, desiredString));
  });
  after(done => {
    server.close(done);
  });
});
/** 
   ...
   your tests here
   ...
**/

/** and, if you need to close the server after the test **/