import React from 'react';
import SocketsProvider from './context/socket.context';
import Home from './pages/Home/Home.page';
import { ToastContainer } from "react-toastify";
import SLayout from './template/Slayout';
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { store } from './store/store';

function App() {
  return (
    <>
      <Provider store={store}>
        {/* <SocketsProvider> */}
          <SLayout/>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
        {/* </SocketsProvider> */}
      </Provider>
    </>
  );
}

export default App;
