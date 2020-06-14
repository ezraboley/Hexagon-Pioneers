import React from 'react';

/* FIXME: This is a very basic implementation of an SVG hexagon */
export default class Hexagon extends React.Component {

    static getPoints(centerX, centerY) {
        let corners = []
        /* Using degrees because floating point math in a 
         * for loop high key sucks. We also need to go one extra angle because
         * we have */
        let y = centerY;// + 60;
        let x = centerX;
        let radius = 60;
        for (let i = 1; i < 7; i++) {
            let angle_deg = 60 * i - 30;
            let angle_rad = Math.PI / 180 * angle_deg;
            corners.push({x:x + radius * Math.cos(angle_rad),
                y: y + radius * Math.sin(angle_rad)})
        } 
        return corners;
    }
    
    /* Need to feed it a series of points 
     * and it connects them!*/
    static buildDString(points) {
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
        /* TODO cleanup, but this is basically how you make a hex grid
         * Check out https://www.redblobgames.com/grids/hexagons/
         * for more awesome details! 
         */

        return (
            <path fill={this.props.fill} stroke="black"
                d={this.props.d} />
        );
    }
}

Hexagon.WIDTH       = Math.sqrt(3) * 60;
Hexagon.HEIGHT      = 2 * 60;

