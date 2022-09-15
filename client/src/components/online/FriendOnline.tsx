import React, { useEffect, useState } from 'react'
import { userService } from '../../services/user.service';
import Loading from '../loading/Loading.component';
import * as st from "./Friend.style";

export default function FriendOnline({onlineUsers}:any) {
  const [isLoading, setIsLoading] = useState(true);
  const [users,setUsers] = useState<any>([]);

  useEffect(() =>{
    const init =async() =>{
      let usersArray :any= [];
      for( let user of onlineUsers ){
        await userService.getUsersById(user.userId)
        .then(({data})=>{
          usersArray.push(data.data.user);
        })
        .catch((error)=>{
          console.log(error);
        })
      }
      setUsers(usersArray);
      setIsLoading(false);
    }
    init();
  },[onlineUsers])
  
  return (
    <st.wrapFriend>
      {
        isLoading?
          <Loading type='spin' color="blue" height={100} width={100}/>:
          <>
        {users?.map((e:any)=>
          (
            <>
          <st.chatOnlineFriend>
            <st.chatOnlineImgContainer>
              <st.chatOnlineImg 
              src="https://static.remove.bg/remove-bg-web/37843dee2531e43723b012aa78be4b91cc211fef/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"/>
              <st.chatOnlineBadge></st.chatOnlineBadge>
            </st.chatOnlineImgContainer>
            <st.chatOnlineName>
              {e.name}
            </st.chatOnlineName>
          </st.chatOnlineFriend>
          </>)
        )}
        </>
      }
    </st.wrapFriend>
  )
}
