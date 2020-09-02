const cors = require('cors');
const express = require('express');

const {Game} = require('./game');
const {config}  = require('./config.js');

const app = express();
app.use(express.json());
const port = 8000;
const games = {};

// const gameName = 'TEST';
// const gamePlayers = 4;

// const newGame = new Game(gameName, gamePlayers);
// games[newGame] = newGame;
app.use(cors());

// THIS DEFINES THE API, UNVALIDATED REQUESTS ARE SEND TO GAME.JS AND
// THIS ALSO WATCHES FOR ERRORS, RETURNING EITHER ERROR MESSAGE
// OR SUCCESS WITH ANY REQUESTED OBJECTS

app.get('/', (req, res) => {
  res.send('Post to / with numPlayers body to create game!');
});

app.post('/', (req, res) => {
  try {
    const newGame = new Game(req.body.gameName, req.body.numPlayers);
    games[newGame] = newGame;
    res.redirect("/" + newGame.toString());
  } catch (err) {
    res.status(400);
    res.json({notification: "Failed to create game"});
  }
});

app.get('/:sessionID/board', (req, res) => {
  res.json({board: games[req.params.sessionID].getBoardState()});
});

app.post('/:sessionID', (req, res) => {
  const game = games[req.params.sessionID];
  // This is where you do stuff
  try {
    switch (req.body.action) {
      case "buildSettlement":
        game.tryBuildSettlement(req.body.loc, req.body.playerID);
        res.json({notification: "Settlement built"});
        break;
      case "build-road":
        res.json({notification: "Road built"});
        break;
      case "end-turn":
        res.json({notification: "Turn ended not implemented"});
        break;
      default:
        res.json({notification: "Action not recognized"});
    }
  } catch (err) {
    res.json({notification: "Action failed"});
  }
});

app.get('*', function(req, res){
  res.status(404).send('Page not found');
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
module.exports.app = app;
