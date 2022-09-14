import React from 'react'
import Conversation from '../conversation/Conversation';
import * as st from "./Menu.style";

export default function Menu() {
  return (
    <st.wrapMenu>
        <st.container>
            <st.searchInput placeholder="Search for friends"/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
        </st.container>
    </st.wrapMenu>
  )
}
