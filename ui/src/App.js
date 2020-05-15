import React from 'react';
import logo from './logo.svg';
import './App.css';
import Hexagon from './Hexagon.js';
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
      <Hexagon/>
    </div>
  );
}

export default App;
