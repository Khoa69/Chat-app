import React, { useEffect, useState } from 'react'
import { userService } from '../../services/user.service';
import * as st from "./Conversation.style"; 

export default function Conversation({conversation, currentUser, handleClick} : any) {
  const [user,setUser]= useState<any>(null);
  useEffect(() => {
    
    const friendId = conversation.members.find((e : any)=> e!== currentUser._id);
    const getUser = async()=>{
      userService.getUsersById(friendId)
      .then(({data})=>{
        setUser(data.data.user);
      })
      .catch((error)=>{
        console.log(error);
      })
    }
    getUser();
  },[])
  return (
    <st.wrapConversation onClick={()=>{handleClick(conversation)}}>
        <st.conversationImg 
        src="https://static.remove.bg/remove-bg-web/37843dee2531e43723b012aa78be4b91cc211fef/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"/>
        <st.conversationName>
          {user?.name}
        </st.conversationName>
    </st.wrapConversation>
  )
}
