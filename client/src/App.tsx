import React from 'react';
import './App.css';
import SocketsProvider from './context/socket.context';
import Home from './pages/Home/Home';

function App() {
  return (
    <>
      {/* <SocketsProvider> */}
        <Home/>
      {/* </SocketsProvider> */}
    </>
  );
}

export default App;
