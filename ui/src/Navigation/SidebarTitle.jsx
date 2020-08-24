import React from 'react'
import { Typography } from '@material-ui/core'

function SidebarTitle(props) {
    return (
    <Typography align='center' variant='h4' gutterBottom>
        {props.text}
    </Typography>)
}

export default SidebarTitle