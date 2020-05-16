import React from 'react';
import Hexagon from './Hexagon.js';

export default class Board extends React.Component {

    COLORS = ["brown", "grey", "gold", "green", "lightgreen"];
    START_X = 100;
    START_Y = 100;
    
    constructor() {
        super();
        this.state = {
            board: []
        }
        this.fetchBoard();
    }


    fetchBoard() {
        // We should get this from a config or something
        const url = 'http://localhost:9000/board';
        fetch(url, {method: 'GET'}).then(
            response => response.json()
        ).then(
            data => {
                console.log("DATA");
                console.log(data);
                this.setState({
                    board: data.tiles
                })
                console.log("BOARD STATE");
                console.log(this.state.board);
            }
        ).catch(
            error => {
                console.log(error);
            }
        );
    }

    buildBoard(xLimit, yLimit, zLimit) {
/*        let xOffset = i % 2 === 0 ? this.START_X : this.START_X - Hexagon.WIDTH / 2;*/
/*        let numHex = i % 2 === 0 ? 6 : 7;*/
        let pathStrs = [];
        let c = 0;
        // FIXME: Probably a better algo out there?
        // Brute force generation
        for (let x = (-1 * xLimit); x <= xLimit; x++) {
            for (let y = (-1 * yLimit); y <= yLimit; y++) {
                for (let z = (-1 * zLimit); z <= zLimit; z++) {
                    if (x + y + z !== 0) continue;
                    console.log({x: x, y: y, z: z});
/*                    let points = Hexagon.getPoints((xOffset + x * Hexagon.WIDTH),*/
/*                        this.START_Y + x * (Hexagon.HEIGHT * 0.75));*/
/*                    pathStrs.push(Hexagon.buildDString(points));*/
                }
            }
        }
        console.log(c);
        return pathStrs;
    }

    render() {
        let tiles = this.buildBoard(3,3,3).map((tileStr) => 
            <Hexagon 
                fill={this.COLORS[Math.floor(Math.random() * this.COLORS.length)]} 
                d={tileStr}
            />)
        return (
            <div>
                <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                    {tiles}
                </svg>
            </div>
        );
    }
}
