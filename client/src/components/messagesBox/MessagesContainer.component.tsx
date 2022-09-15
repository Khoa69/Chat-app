import React, { useEffect, useRef, useState } from 'react'
import { messengerService } from '../../services/messenger.service';
import ChatInput from '../chatInput/ChatInput.component';
import Loading from '../loading/Loading.component';
import Messages from '../message/Message.component'
import * as st from "./MessagesBox.style";

function MessagesContainer({currentChat,auth,socket}:any) {
  const scrollRef = useRef<any>();
  const listInnerRef = useRef<any>();
  const [totalNumber,setTotalNumber] =useState<any>();
  const [messages,setMessages] =useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [submit,setSubmit]= useState(true);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const getMessage= async(page:number,limit:number) =>{
    await messengerService.getAllMessages(currentChat._id,limit,page)
      .then(({data}) => {
        setTotalNumber(data.data.totalNumber);
        setMessages((prev:any)=>[...data.data.messages,...prev]);
        setIsLoading(false);
        setIsLoadMore(false);
      })
      .catch(err => console.error(err))
  }

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop} = listInnerRef.current;
      if (scrollTop === 0) {
        if(totalNumber> messages.length){
          const page = messages.length/15+1;
          setIsLoadMore(true)
          getMessage(page,15)
        };
      }
    }
  };

  const onSubmit = (newMessage: any) => {
    setMessages([...messages,newMessage]);
    const receiverId = currentChat.members.find((member:any)=>  member!=newMessage.sender )
    socket.current.emit("sendMessage",{ 
      senderId:newMessage.sender,
      content:newMessage.content,
      receiverId:receiverId,
    })
    setSubmit(!submit);
  }

  useEffect(()=>{
    getMessage(1,15);
  },[currentChat])

  
  useEffect(()=>{
    socket.current.on("getMessage", (data:any) => {
      const newMessage = {
        sender: data.senderId,
        content: data.content,
        createdAt: Date.now(),
      }
      setArrivalMessage(newMessage);
    });
  },[])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev:any) => [...prev, arrivalMessage]);
      setSubmit(!submit);
  }, [arrivalMessage, currentChat]);

  useEffect(()=>{
    scrollRef?.current?.scrollIntoView({behavior:"smooth"});
  },[submit,isLoading])

  return (
    <st.wrapBox>
       {
        isLoading ?
        <Loading type='spin' color="blue" height={50} width={50}/>:
        <>
        <st.wrapBoxTop onScroll={() => onScroll()} ref={listInnerRef}>
          {isLoadMore &&<Loading type='spin' color="blue" height={50} width={50}/>}
          {
            messages.map((message : any,index : number) =>
              (<div ref={scrollRef} key={index}>
                <Messages  message={message} own={auth.user._id== message.sender}/>
              </div>)
            )
          }
        </st.wrapBoxTop>
        <st.wrapBoxBottom>
          <ChatInput onSubmit={onSubmit} conversationId={currentChat._id} user={auth.user}/>
        </st.wrapBoxBottom>
      </>}     
    </st.wrapBox>
  )
}

export default MessagesContainer