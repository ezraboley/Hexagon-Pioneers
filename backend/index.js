const cors = require('cors');
const express = require('express');

const {Game} = require('./data');
const {config}  = require('./config.js');
const {Player} = require('./player.js');

const app = express();
const port = 8000;
const games = {};

app.use(cors());

app.get('/', (req, res) => {
    res.send('Go to /new-game/:numPlayer for the game!');
});

app.post('/new-game', (req, res) => {
    console.log(req.query)
    const newGame = new Game(req.query.name, req.query.numPlayers);
    games[newGame] = newGame;
    //let players = [];
    // res.json({notification: "Game Created"});
    // res.json({players: players});
});

app.get('/board', (req, res) => {
    let b = new Board(config.BOARD_SIZE);
    res.json({board: b});
});

app.post('/game-action/:gameAction', (req, res) => {
    // This is where you do stuff
    switch (req.params.gameAction) {
    	case "build-settlement":
    		res.json({notification: "Settlement Built"});
    		break;
    	case "build-road":
    		res.json({notification: "Road Built"});
    		break;
    	case "end-turn":
    		res.json({notification: "Turn ended"});
    		break;
    	default:
    		res.json({notification: "Action not recognized"});
    }
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
