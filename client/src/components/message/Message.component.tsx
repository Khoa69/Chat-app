import React from 'react'
import * as st from "./Message.style";
import {format} from 'timeago.js';
export default function Message({own, message}:any) {
  return (
    <st.wrapMessage own={own}>
      <st.messageTop>
      {!own &&
      <st.messageImage 
        src="https://static.remove.bg/remove-bg-web/37843dee2531e43723b012aa78be4b91cc211fef/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"/>
      }
      <st.messageText own={own}>
        {message.content}
      </st.messageText>
      </st.messageTop>
      <st.messageBottom>
        {format(message.createdAt)}
      </st.messageBottom>
    </st.wrapMessage>
  )
}
