import React, { useRef } from 'react'
import ChatInput from '../chatInput/ChatInput.component';
import Messages from '../message/Message.component'
import * as st from "./MessagesBox.style";

function MessagesContainer() {
  const scrollRef = useRef();
  return (
    <st.wrapBox>
      <st.wrapBoxTop>
        <Messages own={true}/>
        <Messages own={false}/>
        <Messages own={true}/>
        <Messages own={false}/>
        <Messages own={false}/>
        <Messages own={false}/>
        <Messages own={true}/>
      </st.wrapBoxTop>
      <st.wrapBoxBottom>
        <ChatInput/>
      </st.wrapBoxBottom>
    </st.wrapBox>
  )
}

export default MessagesContainer