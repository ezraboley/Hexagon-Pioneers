import React, { useState } from 'react';
import PioneerSnackbar from './PioneerSnackbar';
import {Coordinate} from './Board/Board';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import './App.css';
import Board from './Board/Board.js';
import styled from 'styled-components';
import Dashboard from './Navigation/Sidebar.js';
import config from './config'
import ConfirmationButton from './Overlay/ConfirmationButton';
import { ClickAwayListener } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

function App() {    

  const possibleActions = ["Build Town", "Build Road", "End Turn"]

  function rollDice() {
    let die1 = Math.floor(Math.random() * Math.floor(6)) + 1;
    let die2 = Math.floor(Math.random() * Math.floor(6)) + 1;
    let total = die1 + die2;
    handleNewSnack(`Dice: ${die1} + ${die2} = ${total}`)();
    return total;
  }

  function finalizeCorner(board, activeCorner) {
    const pointIsEqual = (p1, p2) => {
      let {x: x1, y: y1} = p1;
      let {x: x2, y: y2} = p2;
      let margin = 5;
      return (
          (margin + x1 >= x2 && x2 >= x1 - margin) && 
          (margin + y1 >= y2 && y2 >= y1 - margin));
    };

    if (!activeCorner.key) {
       return;
    }

    let vals = activeCorner.key.split(',');
    
    let pos = {
        x: parseInt(vals[0]),
        y: parseInt(vals[1]),
        z: parseInt(vals[2])
    };

    let neighbors = [
        new Coordinate(pos.x + 1, pos.y - 1, pos.z),
        new Coordinate(pos.x + 1, pos.y, pos.z - 1),
        new Coordinate(pos.x, pos.y + 1, pos.z - 1),
        new Coordinate(pos.x - 1, pos.y + 1, pos.z),
        new Coordinate(pos.x - 1, pos.y, pos.z + 1),
        new Coordinate(pos.x, pos.y - 1, pos.z + 1),
    ];
    
    let corners = [];
    corners.push(new Coordinate(pos.x, pos.y, pos.z));

    neighbors.forEach((neighbor) => {
        if (board[neighbor] === undefined) return;
        for (let p of board[neighbor].points) {
            // Gotta do some fuzzy matching
            if (pointIsEqual(p, activeCorner)) {
                corners.push(neighbor);
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
  const [boardSize, setBoardSize] = useState(0);
  const [activeCorner, setActiveCorner] = useState({x: 0, y:0, fill: "none", key: null});
  const [currentAction, setCurrentAction] = useState(null);
  const [packet, setPacket] = useState(null);

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
      const url = `${config.url}1/board`;
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

  const handlePress = (button) => async () => {    
    rollDice();
    const btnStr = button.trim().replace(/\s+/g, '-').toLowerCase()
    const url = `${config.url}game-action/${btnStr}`
    setPacket({board: board, corner: finalizeCorner(board, activeCorner)})
    if (btnStr === 'end-turn') {
      try {
        let response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(packet)
        })
        let data = await response.json() 
        handleNewSnack(data.notification)();
      } catch (e) { console.error(`Error: ${e}`) }
    } else {
      setCurrentAction(btnStr)
    }
  }

  async function postData(data, action) {
    const packet = {board: board, corner: finalizeCorner(board, activeCorner)}
    const url = `${config.url}${action}`
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(data)
      });
      console.log(response);
    } catch (e) { 
      console.error(`Error: ${e}`);
    }
    setCurrentAction(null)
    setActiveCorner({})
}

  const classes = useStyles();

    return (
   <AppContainer>
      <Dashboard actions={possibleActions} handlePress={handlePress} boardState={board} userInfo={userInfo} handleNewSnack={handleNewSnack}>
        <Board activeCorner={activeCorner} 
                 size={boardSize} 
                 boardState={board} 
                 setBoardState={setBoard} 
                 setActiveCorner={setActiveCorner} />
      {!currentAction ? null : 
          <ConfirmationButton onClick={postData} action={currentAction} data={packet}/>
      }
      </Dashboard>
      <PioneerSnackbar 
        open={open} 
        messageInfo={messageInfo} 
        setOpen={setOpen} 
        setMessageInfo={setMessageInfo} />
   </AppContainer>
  );
}


const AppContainer = styled.div`
    display: grid;
    grid-template-row: 0fr 100%; 
    height: 100%; 
`;

export default App;
