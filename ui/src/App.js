import React from 'react';
import './App.css';
import Board from './Board.js';
import styled from 'styled-components';
import Dashboard from './Dashboard.js';

function App() {
    /* PROOF OF CONCEPT */
    const url = 'http://localhost:8000/board';
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
   <AppContainer>
      <Dashboard userInfo={userInfo}/>
      <Board />
   </AppContainer>
  );
}


const AppContainer = styled.div`
    height: 100%; 
`;

export default App;
