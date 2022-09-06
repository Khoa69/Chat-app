import { useSockets } from "../../context/socket.context";

import React, { MutableRefObject, useEffect, useRef, useState } from "react";

export default function Home() {
  const { socket, username, setUsername } = useSockets();
  const [userNameInput,setUsernameInput] = useState<string>("") ;

  function handleSetUsername() {
    if (!userNameInput) {
      return;
    }
    localStorage.setItem("username", userNameInput);
    setUsername(userNameInput);
  }

  return (
    <div>
      {!username && (
        <div >
          <div>
            <input placeholder="Username" 
              type="text" 
              onChange={(e)=>{
                setUsernameInput(e.target.value)}
              }
            />
            <button  onClick={handleSetUsername}>
              START
            </button>
          </div>
        </div>
      )}
      {/* {username && (
        <div className={styles.container}>
          <RoomsContainer />
          <MessagesContainer />
        </div>
      )} */}
    </div>
  );
}