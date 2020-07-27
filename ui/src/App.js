import React, { useState } from 'react';
import {Coordinate} from './Board'
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

  function finalizeCorner(board, activeCorner) {
    const pointIsEqual = (p1, p2) => {
      let x1 = p1.x;
      let x2 = p2.x;
      let y1 = p1.y;
      let y2 = p2.y;
      
      let margin = 5;

      return (
          (margin + x1 >= x2 && x2 >= x1 - margin)
      && (margin + y1 >= y2 && y2 >= y1 - margin));
    }

    if (activeCorner.key === null) {
       return;
    }

    let vals = activeCorner.key.split(',');
    
    let pos = {
        x: parseInt(vals[0]), 
        y: parseInt(vals[1]), 
        z: parseInt(vals[2])
    };//this.state.activeCorner.key;
    let cornerX = activeCorner.x;
    let cornerY = activeCorner.y;

    let neighbors = [
        new Coordinate(pos.x + 1, pos.y - 1, pos.z),
        new Coordinate(pos.x + 1, pos.y,pos.z - 1),
        new Coordinate(pos.x, pos.y + 1,pos.z - 1),
        new Coordinate(pos.x - 1, pos.y + 1, pos.z),
        new Coordinate(pos.x - 1, pos.y, pos.z + 1),
        new Coordinate(pos.x, pos.y - 1, pos.z + 1),
    ];
    
    let corners = [];
    corners.push(new Coordinate(pos.x, pos.y, pos.z));

    neighbors.forEach((n) => {
        if (board[n] === undefined) return;
        for (let p of board[n].points) {
            // Gotta do some fuzzy matching
            if (pointIsEqual(p, {x: cornerX, y: cornerY})) {
                corners.push(n);
                break;
            }
        } 
    });
    return corners;
}

    // dummy data TODO move to another file
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

  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);
  const [board, setBoard] = useState([]);
  const [boardSize, setBoardSize] = useState(0)
  const [activeCorner, setActiveCorner] = useState({x: 0, y:0, fill: "none", key: null})

  
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
    const getBoard = async () => {
      const url = `${config.url}board`;
      try {
        let res = await fetch(url)
        let data = await res.json()
        console.log(data)
        setBoard(data.board.tiles)
        setBoardSize(data.board.size)
      } catch (e) {
        console.error(e)
      }
    }
    getBoard()
  }, [])


  const handleNewSnack = (message) => () => {
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

  const handlePress = (button) => () => {
    console.log('button handled' + button);
    
    const btnStr = button.trim().replace(/\s+/g, '-').toLowerCase()
    const url = `${config.url}game-action/${btnStr}`
    const packet = {board: {...boardState}, corner: finalizeCorner(board, activeCorner)};
    console.log(packet)
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(packet)
    })
    .then(data => data.json())
    .then(data => {
      console.log(data);
      handleNewSnack(data.notification)();;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

<<<<<<< HEAD
=======
  const handleActionPress = (button) => () => {
    console.log('button handled' + button);
    var url = 'http://localhost:8000/';
    switch (button) {
      case 'Build Settlement':
        url = url.concat('game-action/build-settlement');
        break;  
      case 'Build Road':
        url = url.concat('game-action/build-road');
        break;
      case 'End Turn':
        url = url.concat('game-action/end-game');
        break;
      default:
        console.error("Cannot completed action " + button);
        return;
    }
    sendPostToServer(url);
  }

  const possibleActions = ['Build Settlement', 'Build Road', 'End Turn'];


>>>>>>> 1705ea0ec44b184a5b76432124703fa52aa3985e
  const classes = useStyles();

    return (
   <AppContainer>
<<<<<<< HEAD
      <Dashboard activeCorner={activeCorner} handlePress={handlePress} boardState={board} userInfo={userInfo} handleNewSnack={handleNewSnack}/>
=======
      <Dashboard possibleActions={possibleActions} handlePress={handleActionPress} sendPostToServer={sendPostToServer} boardState={board} userInfo={userInfo} handleNewSnack={handleNewSnack}/>
>>>>>>> 1705ea0ec44b184a5b76432124703fa52aa3985e
      {boardSize === 0 ? 
        null : 
        <Board activeCorner={activeCorner} size={boardSize} 
        boardState={board} setBoardState={setBoard} setActiveCorner={setActiveCorner}/>
      }
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
