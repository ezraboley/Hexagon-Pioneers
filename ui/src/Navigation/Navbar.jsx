import React from 'react';
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';

import config from '../config';

const drawerWidth = 240;    // TODO remove constant later

const useStyles = makeStyles( theme => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: 'none',
      },
}))


function Navbar(props) {
    const classes = useStyles()

    return (
        <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.onHamburgerClick}
            edge="start"
            className={clsx(classes.menuButton, props.open && classes.hide)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            {config.name}
          </Typography>
        </Toolbar>
      </AppBar>
    )
}

export default Navbar;