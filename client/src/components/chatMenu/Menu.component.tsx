import React, { memo } from 'react'
import Conversation from '../conversation/Conversation';
import * as st from "./Menu.style";

type IpropsMenu={
  conversations?: any,
  currentUser?: any,
  handleClick?: any,
}

const Menu:any=({conversations,currentUser , handleClick}:IpropsMenu)=> {
  return (
    <st.wrapMenu>
        <st.container>
            <st.searchInput placeholder="Search for friends"/>
            {
              conversations.map( (c : any)=>
                {return <Conversation key= {c._id} handleClick={handleClick} conversation={c} currentUser={currentUser}/>}
              )
            }
        </st.container>
    </st.wrapMenu>
  )
}

export default memo(Menu);

