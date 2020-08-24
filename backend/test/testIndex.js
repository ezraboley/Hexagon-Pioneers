const assert = require('assert');
const fetch = require("node-fetch");
const app = require('../index').app;
const port = 3000;
let server; 

before(done => {
  // server = app.listen(port, done);
  // console.log("opening server");
});

describe("get '/'", function () {
  it('should return a string', function () {
    fetch(`http://localhost:${port}`)
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
  });
});
/** 
   ...
   your tests here
   ...
**/

/** and, if you need to close the server after the test **/

after(done => {
  server.close(done);
  console.log("closed server");
});