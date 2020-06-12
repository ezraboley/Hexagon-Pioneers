const express = require('express')
const app = express()
const port = 3000
const {Board} = require('./board.js');

app.get('/', (req, res) => {
    let b = new Board(2);
    console.log(b.tiles);
    res.send("done!");
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

