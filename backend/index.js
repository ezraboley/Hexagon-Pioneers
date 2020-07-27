const cors = require('cors');
const express = require('express');

const {Board} = require('./board.js');
const {config}  = require('./config.js');
const {Player} = require('./player.js');

const app = express();
const port = 8000;
const games = [];

app.use(cors());

app.get('/', (req, res) => {
    res.send('Go to /new-game/:numPlayer for the game!');
});

app.get('/board', (req, res) => {
    let b = new Board(config.BOARD_SIZE);
    res.json({board: b});
});


app.get('/new-game', (req, res) => {
    console.log(req.query)
    let players = [];
    res.json({players: players});
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

