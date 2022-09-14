import React from 'react'
import * as st from "./Message.style";

export default function Message({own}:any) {
  return (
    <st.wrapMessage own={own}>
      <st.messageTop>
      {!own &&
      <st.messageImage 
        src="https://static.remove.bg/remove-bg-web/37843dee2531e43723b012aa78be4b91cc211fef/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"/>
      }
      <st.messageText own={own}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores illo quae minus nemo vel, exercitationem nihil aperiam repellat quis autem eveniet. Fuga reiciendis in quos pariatur? Dolores aperiam suscipit vel.
      </st.messageText>
      </st.messageTop>
      <st.messageBottom>
        20/2312/2313123
      </st.messageBottom>
    </st.wrapMessage>
  )
}
