const {Board} = require('./board.js');
const {config}  = require('./config.js');

const cors = require('cors');
const express = require('express');

const app = express();
const port = 3000;

app.use(cors);

app.get('/', (req, res) => {
    let b = new Board(2);
    res.json(b);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

