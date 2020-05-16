import React from 'react';
import './App.css';
import Board from './Board.js';

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
      <Board/>
    </div>
  );
}

export default App;
