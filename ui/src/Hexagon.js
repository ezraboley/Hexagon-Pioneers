import React from 'react';
import logo from './logo.svg';
import './App.css';

/* FIXME: This is a very basic implementation of an SVG hexagon */

export default class Hexagon extends React.Component {

    POLYGON_DEGREES = 360; // Properties of a polygon
    INTERNAL_ANGLE  = 60;  // Properties of a hexagon
    RADIUS          = 60;  // Determines the size of the shape
    WIDTH           = Math.sqrt(3) * 60;
    HEIGHT          = 2 * 60;
    getPoints(x, y) {
        let corners = []
        /* Using degrees because floating point math in a 
         * for loop high key sucks. We also need to go one extra angle because
         * we have */
        for (let i = 1; i < 7; i++) {
            let angle_deg = 60 * i - 30;
            let angle_rad = Math.PI / 180 * angle_deg;
            corners.push({x:x + this.RADIUS * Math.cos(angle_rad),
                y: y + this.RADIUS * Math.sin(angle_rad)})
        } 
        console.log(corners);  // TODO Remove, just debug
        return corners;
    }
    
    /* Need to feed it a series of points 
     * and it connects them!*/
    buildDString(points) {
        // Need to M(ove) to the position of the first point 
        let dStr = `M ${points[0].x},${points[0].y}`;
        points.forEach((p) => {
            // Connect each point with a L(ine)
            dStr += ` L ${p.x},${p.y}`; 
        });
        // and then z terminates!
        dStr += ` z`;
        return dStr;
    }

    render() {
        let startX = 100;
        let startY = 100;
        
        let pathStrs = [];

        /* TODO cleanup, but this is basically how you make a hex grid
         *
         * Check out https://www.redblobgames.com/grids/hexagons/
         * for more awesome details! 
         */
        for (let i = 0; i < 6; i++) {
            let xOffset = i % 2 === 0 ? startX : startX - this.WIDTH / 2;
            let numHex = i % 2 === 0 ? 6 : 7;
            for (let j = 0; j < numHex; j++) {
                let points = this.getPoints((xOffset + j * this.WIDTH),
                    startY + i * (this.HEIGHT * 0.75));
                pathStrs.push(this.buildDString(points));
            }
        }

        
        // TODO:
        // 
        // We can use Reacts JSX mapping functionality to
        // map a bunch of path tags into the svg canvas.
        
        let lines = pathStrs.map((dStr) => 
            <path fill="red" stroke="black"
                d={dStr} />
        );
        return (
            <div>
                <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                    {lines}
                </svg>
            </div>
        );
    }
}
