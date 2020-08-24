import React from 'react'
import {Typography, List, ListItem, ListItemText} from '@material-ui/core'
import SidebarTitle from './SidebarTitle';


function ResourceList(props) {
    return (
        <div>
            <SidebarTitle text='Resources'/>
            <List>
            { 'hand' in props.userInfo &&
                Object.keys(props.userInfo.hand.resourceCards).map((k) => (
                    <ListItem key={k}>
                        <ListItemText primary={k} secondary={props.userInfo.hand.resourceCards[k]}/>
                    </ListItem>
                ))
            } 
            </List>
        </div>
    )
}

export default ResourceList;