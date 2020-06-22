const cors = require('cors');
const express = require('express');

const {Board} = require('./board.js');
const {config}  = require('./config.js');
const {Player} = require('./player.js');

const app = express();
const port = 8000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Go to /new-game/:numPlayer for the game!');
});

app.get('/board', (req, res) => {
    let b = new Board(config.BOARD_SIZE);
    res.json({board: b});
});

app.get('/new-game/:numPlayers', (req, res) => {
    let players = [];
    for (let i = 0; i < req.params.numPlayers; i++) {
        players.push(new Player());
    }
    res.json({players:players});
});

app.get('/:id/:action', (req, res) => {
    // This is where you do stuff
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

