import React, { useEffect, useState } from 'react';
import Hexagon from './Hexagon.js';
import styled from 'styled-components';
import config from './config'

export class Coordinate {
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

export default function Board(props) {
    // A basic implementation of a way to check which corner
    // a user clicks. Could be made better, but it works!
    function clickHandler(e, points, pos) {
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
        props.setActiveCorner(
            {
                x: corner.x,
                y: corner.y,
                fill: "red",
                key: pos
            });
    }
    
    function buildBoard() {
        console.log(props.boardState)
        if (props.boardState === undefined) 
            return null;
        let positions = Object.keys(props.boardState);
        let pathStrs = [];
        let newBoard = props.boardState;
        console.log("here")
        positions.forEach((pos) => {
            let offset = 300;
            let {x,y,z} = props.boardState[pos].pos;
            
            let points = Hexagon.getPoints(
                (offset + 
                    (x-y) * Hexagon.WIDTH/2),
                (offset + 
                    (z) * (Hexagon.HEIGHT * 0.75)));
            newBoard[pos].points = points;
            pathStrs.push( 
                <Hexagon
                    handleClick={clickHandler}
                    resource= {props.boardState[pos].res.type} 
                    points= {points}
                    boardKey={pos}
                />
            );
        });
        return pathStrs;
    }

    const [board,setBoard] = useState(null);

    useEffect(() => {
        setBoard(buildBoard())
    }, [props.boardState])

    if (board === null) 
        return null;

    return (
        <BoardContainer>
            <BoardSpan/>
            <BoardGraphic viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                {board}
                <circle 
                    cx={props.activeCorner.x} 
                    cy={props.activeCorner.y} 
                    r={6} 
                    fill={props.activeCorner.fill}
                    stroke={"black"}
                    strokeWidth={4}
                    style={{zIndex: 2}}>
                </circle>
            </BoardGraphic>
            <BoardSpan/>
        </BoardContainer>
        );
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
