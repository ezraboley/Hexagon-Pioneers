import React from 'react'

function City(props) {
    const {x, y, fill} = props
    return (
        <path 
            p={`M ${x + 10} ${y + 12} 
                L ${x + 10} ${y - 12}
                L ${x} ${y - 16}
                L ${x - 10} ${y - 12}
                L ${x - 10} ${y}
                L ${x - 20} ${y}
                L ${x - 20} ${y + 12}
                L ${x + 10} ${y + 12}`}
            fill={fill}
            stroke={"black"}
            strokeWidth={4}
            style={{zIndex: 2}}
        ></path>
    )
}

export default City