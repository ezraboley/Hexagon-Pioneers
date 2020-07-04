import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import './App.css';
import Board from './Board.js';
import styled from 'styled-components';
import Dashboard from './Dashboard.js';
import config from './config'
const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

function App() {    

    // dummy data
    const userInfo = {
        hand: {
            resourceCards: {
                sheep: 0,
                wheat: 1,
                wood: 1,
                brick: 1,
                ore: 2,
            }
        }
    };

  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);
  const [boardState, setBoardState] = React.useState({});
  
  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  React.useEffect(() => {
    const url = `${config.url}board`;
    fetch(url, {method: 'GET'}).then(
        response => response.json()
    ).then(
        data=> 
        {
            console.log(data)
        }
    ).catch(error=> {
        console.error(error);
    });
  }, [])

  const handleNewSnack = (message) => () => {
    console.log("snack handled");
    setSnackPack((prev) => [...prev, { message, key: message }]);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const classes = useStyles();

    return (
   <AppContainer>
      <Dashboard userInfo={userInfo} handleNewSnack={handleNewSnack}/>
      <Board />
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        message={messageInfo ? messageInfo.message : undefined}
      />
   </AppContainer>
  );
}


const AppContainer = styled.div`
    display: grid;
    grid-template-row: 0fr 100%; 
    height: 100%; 
`;

export default App;
