import React from 'react';

/* FIXME: This is a very basic implementation of an SVG hexagon */
export default class Hexagon extends React.Component {

    COLORS = {brick:"brown", ore:"grey", wheat:"gold", 
        wood:"green", wool:"lightgreen"};

    static getPoints(centerX, centerY) {
        let corners = []
        /* Using degrees because floating point math in a 
         * for loop high key sucks. We also need to go one extra angle because
         * we have */
        let y = centerY; 
        let x = centerX;
        let radius = 60;
        for (let i = 1; i < 7; i++) {
            let angle_deg = 60 * i - 30;
            let angle_rad = Math.PI / 180 * angle_deg;
            corners.push({
                x:x + radius * Math.cos(angle_rad),
                y: y + radius * Math.sin(angle_rad),
                relX: 0,
                relY: 0});
        } 
        let minX = Infinity;
        let minY = Infinity;
        corners.forEach(({x, y}) => {
            if (x < minX) minX = x;
            if (y < minY) minY = y;
        });

        for (let i = 0; i < corners.length; i++) {
            corners[i].relX = corners[i].x - minX;
            corners[i].relY = corners[i].y - minY;
        }

        return corners;
    }
    
    constructor(props) {
        super(props)
        this.state = {activeCorner: <svg></svg>}
        let dStr = `M ${this.props.points[0].x},${this.props.points[0].y}`;
        this.props.points.forEach((p) => {
            // Connect each point with a L(ine)
            dStr += ` L ${p.x},${p.y}`; 
        });
        // and then z terminates!
        dStr += ` z`;
        this.path = dStr;
    }


    render() {
        /* TODO cleanup, but this is basically how you make a hex grid
         * Check out https://www.redblobgames.com/grids/hexagons/
         * for more awesome details! 
         */
        return (
            <svg>
                <path 
                    onClick={(e) => this.props.handleClick(e, this.props.points, this.props.boardKey)} 
                    fill={this.COLORS[this.props.resource]} 
                    stroke="black"
                    d={this.path} />
            {this.state.activeCorner}
            </svg>
        );
    }
}

Hexagon.WIDTH       = Math.sqrt(3) * 60;
Hexagon.HEIGHT      = 2 * 60;

