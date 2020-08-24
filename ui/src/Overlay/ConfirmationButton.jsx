import React, { useEffect, useState } from 'react'
import Fab from '@material-ui/core/Fab'
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core';
import config from '../config'

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(8),
        left: theme.spacing(2)
      }
}))

function ConfirmationButton(props) {
    const classes = useStyles()
    const [action, setAction] = useState('')
    const [data, setData] = useState({})
    console.log(props.action)
    console.log(props)
    useEffect(() =>{
        setAction(props.action)
        setData(props.data)
    }, [ props.data, props.action])

    

    return (
        <Fab color='primary' onClick={() => props.onClick(data, action)} className={classes.fab} variant='extended'>
            {"Confirm"}
        </Fab>
    )
}

export default ConfirmationButton