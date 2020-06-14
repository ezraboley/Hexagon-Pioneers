import React from 'react';
import './App.css';
import Board from './Board.js';
import styled from 'styled-components';

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

    return (
    <AppContainer>
        <Board/>
    </AppContainer>
  );
}

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export default App;
