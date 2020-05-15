import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
/*    const Http = new XMLHttpRequest();*/
    const url = 'http://localhost:9000/board';
/*    Http.open("GET", url);*/
/*    Http.send();*/
/*    Http.onreadystatechange = (e)=>{*/
/*        console.log(Http.responseText);*/
/*    }*/
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

    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
