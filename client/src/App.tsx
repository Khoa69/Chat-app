import React from 'react';
import SocketsProvider from './context/socket.context';
import Home from './pages/Home/Home.page';
import SLayout from './template/Slayout';

function App() {
  return (
    <>
      {/* <SocketsProvider> */}
        <SLayout/>
      {/* </SocketsProvider> */}
    </>
  );
}

export default App;
