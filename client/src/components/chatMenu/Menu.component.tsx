import React, { memo } from 'react'
import Conversation from '../conversation/Conversation';
import searchIcon from "../../assets/searchIcon.svg";
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
            <st.title>Chat</st.title>
            <st.search>
              <st.searchIcon src={searchIcon} height={40} width={20} />
              <st.searchInput placeholder='Tìm kiếm trên messenger'/>
            </st.search>
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

