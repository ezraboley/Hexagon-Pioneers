const assert = require('assert');
const fetch = require("node-fetch");
const app = require('../index').app;
const {locationListToString} = require('../utils.js');
const port = 3000;
const urlBase = `http://localhost:${port}`;
let server; 


const corner1 = [{x: 0, y: -1, z: 1},
                {x: -1, y: 0, z: 1},
                {x: -1, y: -1, z: 2}];

const invaildCorner1 = [{x: 0, y: -1, z: 1},
                        {x: -1, y: 0, z: 1},
                        {x: -1, y: -1, z: 1}];

before(done => {
  server = app.listen(port, done);
});

describe("get '/'", function () {
  it('should return a string', function () {
    const desiredString = 'Post to / with numPlayers body to create game!';
    return fetch(urlBase)
      .then(response => response.text())
      .then((data) => assert.equal(data, desiredString));
  });
});

describe("404", function () {
  it('should return "Page not found"', function () {
    const endpoint = '/fake-point'
    const desiredString = 'Page not found';
    return fetch(urlBase + endpoint)
      .then(response => response.text())
      .then(data => assert.equal(data, desiredString));
  });
});

describe("post '/'", function () {
  it('should redirect Test Game to /test-game', function () {
    const data = {
      'gameName': "Test Game",
      'numPlayers': 4
    };

    return fetch(urlBase, {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => assert.equal(response.url, urlBase + "/test-game"));
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

});

describe("get '/:sessionID/board'", function () {
  it('should return a board with tiles', async function () {
    const data = {
      'gameName': "First Game",
      'numPlayers': 3,
    };

    await fetch(urlBase, {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return fetch(urlBase + "/first-game" + "/board")
      .then(response => response.json())
      .then(data => assert('0,0,0' in data.board.tiles)); 
  });
});

describe("post action to '/:sessionID/'", function () {
  describe("game action 'buildSettlement'", function () {
    it("should create a settlement at a valid corner", async function () {
      const data = {
        'gameName': "Test Game",
        'numPlayers': 4,
      };

      await fetch(urlBase, {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });  
      await fetch(urlBase + "/test-game", {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
          'action': 'buildSettlement',
          'loc': corner1,
          'playerID' : 4
        }),
      });

      return fetch(urlBase + "/test-game" + "/board")
        .then(response => response.json())
        .then(data => assert(locationListToString(corner1) in data.board.occupiedCorners));
    });
    it("should not create a settlement at an invalid corner", async function () {
      const data = {
        'gameName': "Test Game",
        'numPlayers': 4,
      };

      await fetch(urlBase, {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });  
      await fetch(urlBase + "/test-game", {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
          'action': 'buildSettlement',
          'loc': invaildCorner1,
          'playerID' : 4
        }),
      });

      return fetch(urlBase + "/test-game" + "/board")
        .then(response => response.json())
        .then(data => assert(!(locationListToString(invaildCorner1) in data.board.occupiedCorners)));
    });
  });
});

after(done => {
  server.close(done);
});