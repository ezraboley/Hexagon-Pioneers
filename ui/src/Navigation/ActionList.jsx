import React from 'react'
import {List, ListItem, ListItemText} from '@material-ui/core'

import SidebarTitle from './SidebarTitle';

function ActionList(props) {
    return (
        <div>
            <SidebarTitle text='Actions'/>
            <List>
                {props.actions.map((k) => (
                <ListItem button onClick={props.onClick(k)} key={k}>
                    <ListItemText primary={k}/>
                </ListItem>
                ))}
            </List>
        </div>
    );
}

ActionList.defaultProps = {
    actions: [],
    onClick: () => (value) => { console.warn(`No handler, got: ${value}`)}
}

export default ActionList;