import React from 'react';
import './App.css';
import Board from './Board.js';
import Dashboard from './Dashboard.js';

function App() {
    /* PROOF OF CONCEPT */
    const url = 'http://localhost:9000/board';
    fetch(url, {method: 'GET'}).then(
        response => response.json()
    ).then(
        data=> {
            console.log(data)
        }
    ).catch(error=> {
        console.error(error);
        console.log('errr');
    });
    /**/
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


    return (
    <div className="App">
      <Dashboard userInfo={userInfo}>
        <Board />
      </Dashboard>
    </div>
  );
}

export default App;
