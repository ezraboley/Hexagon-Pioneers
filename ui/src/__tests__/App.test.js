import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
// import { unmountComponentAtNode } from "react-dom";

// let container = null;
// beforeEach(() => {
//   // setup a DOM element as a render target
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

describe("app skeleton", () => {
  it('should have a title bar labeled "Hexagon Pioneers"', () => {
    const { getByText } = render(<App />);
    expect(getByText('Hexagon Pioneers')).toBeInTheDocument();
  }); 
});

describe('app startup', () => {
  it('should make a request for a map', () => {
    const { getByText } = render(<App/>);
  });
});

describe("sidebar", () => {
  it('should have some resources', () => {
    const { getByText } = render(<App />);
    expect(getByText('sheep')).toBeInTheDocument();
    expect(getByText('wheat')).toBeInTheDocument();
  })
  it('should have a build town action', () => {
    const { getByText } = render(<App />);
    expect(getByText('Build Town')).toBeInTheDocument();
  });
  it('should have a build road action', () => {
    const { getByText } = render(<App />);
    expect(getByText('Build Road')).toBeInTheDocument();
  });
  it('should have a end turn action', () => {
    const { getByText } = render(<App />);
    expect(getByText('End Turn')).toBeInTheDocument();
  });
});

// describe('snackbar', () => {
//   it('should display a message sent to it', () => {
//     render(<App/>);
//     screen.debug();

//     fireEvent.change(screen.getByText(/Hexagon/), {
//       message: "TEST",
//     });

//     screen.debug();
//   });
// });
// it('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
