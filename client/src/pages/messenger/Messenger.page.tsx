import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Menu from "../../components/chatMenu/Menu.component";
import Loading from "../../components/loading/Loading.component";
import MessagesContainer from "../../components/messagesBox/MessagesContainer.component";
import FriendOnline from "../../components/online/FriendOnline";
import { conversationService } from "../../services/conversation.service";
import { RootState } from "../../store/store";
import { IauthContext } from "../../types";
import * as st from "./Messenger.style";
import { io } from "socket.io-client";
import config from "../../config/default";

const Messenger: React.FC = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const socket = useRef<any>();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const auth = useSelector<RootState, IauthContext>((state) => state.auth);
  let navigate = useNavigate();

  useEffect(() => {
    conversationService
      .getAllConversationsById(auth.user._id)
      .then(({ data }) => {
        setConversations(data.data.conversations);
        setIsLoading(false);
      })
      .catch((error) => {
        navigate("/");
      });
  }, [auth.user._id]);

  useEffect(() => {
    socket.current = io(config.socket_url);
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", auth.user._id);
    socket.current.on("getUsers", (users: any) => {
      setOnlineUsers(users.filter((f: any) => auth.user._id != f.userId));
    });
  }, [auth]);

  const handleClickConversation = useCallback((chat: any) => {
    setCurrentChat(chat);
  }, []);

  return (
    <st.wrapContainer>
      {isLoading ? (
        <Loading type="spin" color="blue" height={100} width={100} />
      ) : (
        <>
          <Menu
            handleClick={handleClickConversation}
            conversations={conversations}
            currentUser={auth.user}
          />
          {currentChat ? (
            <MessagesContainer
              socket={socket}
              auth={auth}
              currentChat={currentChat}
            />
          ) : (
            <st.wrapBoxNoText>
              Please Select One Person to connect
            </st.wrapBoxNoText>
          )}
          <FriendOnline
            onlineUsers={onlineUsers}
            handleClick={handleClickConversation}
          />
        </>
      )}
    </st.wrapContainer>
  );
};
export default Messenger;
