import React from 'react';
import Hexagon from './Hexagon.js';
import styled from 'styled-components';

export default class Board extends React.Component {

    COLORS = ["brown", "grey", "gold", "green", "lightgreen"];
    START_X = 100;
    START_Y = 100;
    
    constructor() {
        super();
        this.state = {
            board: []
        }
    }

    componentDidMount() {
        const url = 'http://localhost:8000/board';
        fetch(url, {method: 'GET'}).then(
            response => response.json()
        ).then(
            data => {
                console.log("DATA");
                console.log(data.board);
                this.setState({
                    board: data.board.tiles,
                    size: data.board.size
                });
                console.log("BOARD STATE");
                console.log(this.state.board);
            }
        ).catch(
            error => {
                console.log(error);
            }
        );
    }

    buildBoard() {
        if (this.state.board === undefined) return;
        let positions = Object.keys(this.state.board);
        let pathStrs = [];
        console.log(positions);
        console.log(this.state.board);
        positions.forEach((pos) => {
            console.log(pos);
            let offset = 500;
            if (this.state.board[pos].pos.z % 2 !== 0) {
               offset = 500;
            } else {
                offset = 500;
            }
            console.log(500 + offset + this.state.board[pos].pos.x * Hexagon.WIDTH);
            let {x,y,z} = this.state.board[pos].pos;
            
            let points = Hexagon.getPoints(
                (offset + 
                    (x-y) * Hexagon.WIDTH/2),
                (500 + 
                    (z) * (Hexagon.HEIGHT * 0.75)));
            pathStrs.push(Hexagon.buildDString(points));

        });
        return pathStrs;
    }

    render() {
        let board = this.buildBoard()
        if (board === undefined) return <p>end</p>;
        let tiles = board.map((tileStr) => 
            <Hexagon 
                fill={this.COLORS[Math.floor(Math.random() * this.COLORS.length)]} 
                d={tileStr}
            />)
        return (
            <BoardContainer>
                <Graphics viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                    {tiles}
                </Graphics>
            </BoardContainer>
        );
    }
}

const Graphics = styled.svg`
    height: 100vh;
    width: 100%;

`;

const BoardContainer = styled.div`
    position: absolute;
    height: 100vh;
    width: 100%;
`;
