import React from 'react'

function Road(props) {
    const {x, y, fill} = props
    return (
            <rect
                x={x}
                y={y}
                width={10} 
                height={30} 
                fill={fill}
                transform={`rotate(120,${x},${y - 5})`}  // Rotates along an edge (angle, (point we rotate around -> x,y))
            />
    )
}

export default Road