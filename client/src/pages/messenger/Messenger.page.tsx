import React from 'react'
import Menu from '../../components/chatMenu/Menu.component';
import MessagesContainer from '../../components/messagesBox/MessagesContainer.component';
import FriendOnline from '../../components/online/FriendOnline';
import * as st from "./Messenger.style";

const Messenger:React.FC = () =>{
  return (
    <st.wrapContainer>
      <Menu/>
      <MessagesContainer/>
      <FriendOnline/>
    </st.wrapContainer>
  )
}
export default Messenger;
