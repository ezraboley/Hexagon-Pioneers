const assert = require('assert');
const fetch = require("node-fetch");
const app = require('../index').app;
const port = 3000;
const urlBase = `http://localhost:${port}`;
let server; 

before(done => {
  server = app.listen(port, done);
});

describe("get '/'", function () {
  it('should return a string', async function () {
    const desiredString = 'Post to / with numPlayers body to create game!';
    return fetch(urlBase)
      .then(response => response.text())
      .then((data) => assert.equal(data, desiredString));
  });
});

describe("404", function () {
  it('should return "Page not found"', async function () {
    const endpoint = '/fake-point'
    const desiredString = 'Page not found';
    return fetch(urlBase + endpoint)
      .then(response => response.text())
      .then(data => assert.equal(data, desiredString));
  });
});

describe("post '/'", function () {
  it(`should return success creating a game called "TestGame" with 4 players`, async function () {
    const data = {
      'gameName': "TestGame",
      'numPlayers': 4
    };

    return fetch(urlBase, {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => assert.equal(response.url, urlBase + "/testgame"));
  });
  it('should fail with 0 players', function () {
    const data = {
      'gameName': "TestGame",
      'numPlayers': 0,
    };

    return fetch(urlBase, {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => assert.equal(response.status, '400'));   
  });
  // it('should redirect Test Game to /test-game', function () {
  //   const gameName = "Test Game";
  //   const numPlayers = 3;
  //   const data = {
  //     'gameName': gameName,
  //     'numPlayers': numPlayers
  //   };

  //   return fetch(urlBase, {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json' },
  //     body: JSON.stringify(data),
  //   })
  //     .then(response => response.json())
  //     .then((json) => assert.equal(json.gameID, 'test-game')); 
  // });
});

after(done => {
  server.close(done);
});