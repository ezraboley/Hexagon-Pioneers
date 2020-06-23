import React from 'react';
import Hexagon from './Hexagon.js';
import styled from 'styled-components';

class Coordinate {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = "cube";
    }

    toString() {
        return `${this.x},${this.y},${this.z}`;
    }
}

export default class Board extends React.Component {

    START_X = 100;
    START_Y = 100;
    
    constructor() {
        super();
        this.state = {
            board: [],
            activeCorner: {x: 0, y:0, fill: "none", key: null}
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        const url = 'http://localhost:8000/board';
        fetch(url, {method: 'GET'}).then(
            response => response.json()
        ).then(
            data => {
                this.setState({
                    board: data.board.tiles,
                    size: data.board.size
                });
            }
        ).catch(
            error => {
                console.log(error);
            }
        );
    }

    // A basic implementation of a way to check which corner
    // a user clicks. Could be made better, but it works!
    clickHandler(e, points, pos) {
        e.persist();
        let minDistance = Infinity;
        let corner = {};
        let rect = e.target.getBoundingClientRect();
        let clickX = e.clientX - rect.left;
        let clickY = e.clientY - rect.top;
        points.forEach(({x, y, relX, relY}) => {
            // Its pythagreus baby!
            let a = relX - clickX;
            let b = relY - clickY;
            let distance = Math.sqrt(a * a + b * b);
            if (distance < minDistance) {
                minDistance = distance;
                corner = {x: x, y: y};
            }
        })
        this.setState(
            {activeCorner: {
                x: corner.x,
                y: corner.y,
                fill: "red",
                key: pos}});
    }
    
    buildBoard() {
        if (this.state.board === undefined) return;
        let positions = Object.keys(this.state.board);
        let pathStrs = [];
        console.log(this.state.board);
        let newBoard = this.state.board;
        positions.forEach((pos) => {
            let offset = 300;
            let {x,y,z} = this.state.board[pos].pos;
            
            let points = Hexagon.getPoints(
                (offset + 
                    (x-y) * Hexagon.WIDTH/2),
                (offset + 
                    (z) * (Hexagon.HEIGHT * 0.75)));
            newBoard[pos].points = points;
            pathStrs.push( 
                <Hexagon
                    handleClick={this.clickHandler}
                    resource= {this.state.board[pos].res.type} 
                    points= {points}
                    boardKey={pos}
                />
            );
        });
        return pathStrs;
    }

    pointIsEqual(p1, p2) {
        let x1 = p1.x;
        let x2 = p2.x;
        let y1 = p1.y;
        let y2 = p2.y;
        
        let margin = 5;


        return (
            (margin + x1 >= x2 && x2 >= x1 - margin)
        && (margin + y1 >= y2 && y2 >= y1 - margin));
    }

    finalizeCorner() {
        if (this.state.activeCorner.key === null) {
           return;
        }

        let vals = this.state.activeCorner.key.split(',');
        
        let pos = {
            x: parseInt(vals[0]), 
            y: parseInt(vals[1]), 
            z: parseInt(vals[2])
        };//this.state.activeCorner.key;
        let cornerX = this.state.activeCorner.x;
        let cornerY = this.state.activeCorner.y;

        this.neighbors = [
            new Coordinate(pos.x + 1, pos.y - 1, pos.z),
            new Coordinate(pos.x + 1, pos.y,pos.z - 1),
            new Coordinate(pos.x, pos.y + 1,pos.z - 1),
            new Coordinate(pos.x - 1, pos.y + 1, pos.z),
            new Coordinate(pos.x - 1, pos.y, pos.z + 1),
            new Coordinate(pos.x, pos.y - 1, pos.z + 1),
        ];
        
        let corners = [];
        corners.push(new Coordinate(pos.x, pos.y, pos.z));

        // Terrible, I know
        this.neighbors.forEach((n) => {
            if (this.state.board[n] === undefined) return;
            for (let p of this.state.board[n].points) {
                // Gotta do some fuzzy matching
                if (this.pointIsEqual(p, {x: cornerX, y: cornerY})) {
                    corners.push(n);
                    break;
                }
            } 
        });
        console.log(corners);
    }

    render() {
        let board = this.buildBoard()
        if (board === undefined) return <p>end</p>;
        this.finalizeCorner();
        return (
            <BoardContainer>
                <BoardSpan/>
                <BoardGraphic viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                    {board}
                    <circle 
                        cx={this.state.activeCorner.x} 
                        cy={this.state.activeCorner.y} 
                        r={6} 
                        fill={this.state.activeCorner.fill}
                        stroke={"black"}
                        strokeWidth={4}
                        style={{zIndex: 2}}>
                    </circle>
                </BoardGraphic>
                <BoardSpan/>
            </BoardContainer>
        );
    }
}

const BoardGraphic = styled.svg`
    height: 100%;
`;

const BoardSpan = styled.span`
    flex-grow: 2;
`;

const BoardContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
`;
