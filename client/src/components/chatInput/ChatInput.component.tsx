import React, { useState } from 'react'
import { messengerService } from '../../services/messenger.service';
import { Imessage } from '../../types';
import * as st from "./ChatInput.style";

export default function ChatInput({conversationId,user,onSubmit}:any) {
  const [newMessage,setNewMessage] =useState<string>();

  const handleSubmit = async(e :any) => {
    e.preventDefault();
    if(newMessage){
      const message: Imessage={
        sender:user._id,
        content:newMessage,
        conversationId: conversationId,
      }
      
      await messengerService.sendMessage(message)
        .then(({data})=>{
          setNewMessage("");
          onSubmit(data.data.savedMessage);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
  
  return (
    <>
        <st.chatInput
          placeholder="Type Something"
          onChange={(e)=>setNewMessage(e.target.value)}
          value={newMessage}
        />
        <st.submitButton onClick={handleSubmit}>Send</st.submitButton>
    </>
  )
}
