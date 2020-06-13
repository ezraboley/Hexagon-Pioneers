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
    return (
    <div className="App">
      <Dashboard>
        <Board/>
      </Dashboard>
    </div>
  );
}

export default App;
