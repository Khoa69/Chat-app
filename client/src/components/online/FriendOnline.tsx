import React from 'react'
import * as st from "./Friend.style";

export default function FriendOnline() {
  return (
    <st.wrapFriend>
        <st.chatOnlineFriend>
          <st.chatOnlineImgContainer>
            <st.chatOnlineImg 
            src="https://static.remove.bg/remove-bg-web/37843dee2531e43723b012aa78be4b91cc211fef/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"/>
            <st.chatOnlineBadge></st.chatOnlineBadge>
          </st.chatOnlineImgContainer>
          <st.chatOnlineName>
            Test
          </st.chatOnlineName>
        </st.chatOnlineFriend>
    </st.wrapFriend>
  )
}
