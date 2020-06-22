import React from 'react';
import Hexagon from './Hexagon.js';
import styled from 'styled-components';

export default class Board extends React.Component {

    START_X = 100;
    START_Y = 100;
    
    constructor() {
        super();
        this.state = {
            board: [],
            activeCorner: <svg/>
        }
        this.clickHandler = this.clickHandler.bind(this);
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

    // A basic implementation of a way to check which corner
    // a user clicks. Could be made better, but it works!
    clickHandler(e, points) {
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
            {activeCorner: 
                <circle 
                    cx={corner.x} 
                    cy={corner.y} 
                    r={6} 
                    fill={"red"}
                    stroke={"black"}
                    strokeWidth={4}
                    style={{zIndex: 2}}>
                </circle>});
    }
    
    buildBoard() {
        if (this.state.board === undefined) return;
        let positions = Object.keys(this.state.board);
        let pathStrs = [];
        console.log(positions);
        console.log(this.state.board);
        positions.forEach((pos) => {
            let offset = 300;
            let {x,y,z} = this.state.board[pos].pos;
            
            let points = Hexagon.getPoints(
                (offset + 
                    (x-y) * Hexagon.WIDTH/2),
                (offset + 
                    (z) * (Hexagon.HEIGHT * 0.75)));
            pathStrs.push( <Hexagon
                handleClick={this.clickHandler}
                resource= {this.state.board[pos].res.type} 
                points= {points}
                />
            );
        });
        return pathStrs;
    }

    render() {
        let board = this.buildBoard()
        if (board === undefined) return <p>end</p>;
        return (
            <BoardContainer>
                <BoardSpan/>
                <BoardGraphic viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                    {board}
                    {this.state.activeCorner}
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
