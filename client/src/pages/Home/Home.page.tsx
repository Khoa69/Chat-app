import { useSockets } from "../../context/socket.context";

import React, { MutableRefObject, useEffect, useRef, useState } from "react";

const Home:React.FC = () =>{
  const { socket, username, setUsername } = useSockets();
  const [userNameInput,setUsernameInput] = useState<string>("") ;

  return (
    <div>
        <div >
          <div>
            
            <div>tadsads</div>
            <div>tadsads</div>
            <div>tadsads</div>
            <div>tadsads</div>
            <div>tadsads</div>
            <div>tadsads</div>

          </div>
        </div>
    </div>
  );
}

export default Home;