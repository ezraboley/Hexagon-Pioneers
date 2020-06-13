const {Board} = require('./board.js');
const {config}  = require('./config.js');
const {Player} = require('./player.js');

const cors = require('cors');
const express = require('express');

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Go to /new-game/:numPlayer for the game!');
});

app.get('/new-game/:numPlayers', (req, res) => {
    let b = new Board(config.BOARD_SIZE);
    let players = [];
    for (let i = 0; i < req.params.numPlayers; i++) {
        players.push(new Player());
    }
    res.json({board: b, players:players});
});

app.get('/:player-ID/:action', (req, res) => {
    // This is where you do stuff
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

