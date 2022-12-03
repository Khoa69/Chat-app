import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { conversationService } from "../../services/conversation.service";
import { userService } from "../../services/user.service";
import { RootState } from "../../store/store";
import { IauthContext } from "../../types";
import Loading from "../loading/Loading.component";
import * as st from "./Friend.style";

export default function FriendOnline({ onlineUsers, handleClick }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<any>([]);
  const auth = useSelector<RootState, IauthContext>((state) => state.auth);

  useEffect(() => {
    const init = async () => {
      let usersArray: any = [];
      for (let user of onlineUsers) {
        await userService
          .getUsersById(user.userId)
          .then(({ data }) => {
            usersArray.push(data.data.user);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      setUsers(usersArray);
      setIsLoading(false);
    };
    init();
  }, [onlineUsers]);

  const handleGetChat = async (id: string) => {
    var form = {
      members: [id, auth.user._id],
    };
    console.log(form);

    await conversationService
      .getOrCreateConversation(form)
      .then(({ data }) => {
        console.log(data.data.conversations);
        handleClick(data.data.conversations);
      })
      .catch((error) => {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      });
  };

  return (
    <st.wrapFriend>
      {isLoading ? (
        <Loading type="spin" color="blue" height={100} width={100} />
      ) : (
        <>
          {users?.map((e: any) => (
            <>
              <st.chatOnlineFriend onClick={() => handleGetChat(e._id)}>
                <st.chatOnlineImgContainer>
                  <st.chatOnlineImg src="https://static.remove.bg/remove-bg-web/37843dee2531e43723b012aa78be4b91cc211fef/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg" />
                  <st.chatOnlineBadge></st.chatOnlineBadge>
                </st.chatOnlineImgContainer>
                <st.chatOnlineName>{e.name}</st.chatOnlineName>
              </st.chatOnlineFriend>
            </>
          ))}
        </>
      )}
    </st.wrapFriend>
  );
}
