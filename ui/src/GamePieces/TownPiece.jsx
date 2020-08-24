import React from 'react'

function Town(props) {
    const {x, y, fill} = props
    return (
    <path 
        d={`M ${x + 10} ${y + 8} 
            L ${x + 10} ${y - 8}
            L ${x} ${y - 13}
            L ${x - 10} ${y - 8}
            L ${x - 10} ${y + 8}
            L ${x + 10} ${y + 8}`} 
        fill={fill}
        //stroke={"black"}
        //strokeWidth={4}
        style={{zIndex: 2}}>
    </path>
    )
}

export default Town