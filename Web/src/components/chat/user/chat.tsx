import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { IChat } from "constants/chatUserSampleList";
import { IUserData } from "./main";

interface ChatProps {
  userData: IUserData;
}
function Chat({ userData }: ChatProps) {
  const [chat, setChat] = useState<string>("");
  const [chatList, setChatList] = useState<IChat[]>([
    { user: "client", message: "하이요", time: new Date() },
    { user: "client", message: "하이요", time: new Date() }
  ]);
  const chatListRef = useRef<HTMLDivElement>(null);

  const scrollDownEvent = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight * 2;
    }
  };

  const sendChatEvent = async () => {
    setChatList(prev => [
      ...prev,
      {
        user: "customer",
        message: chat,
        time: new Date()
      }
    ]);
    webSocket.send(chat);
    setChat("");
  };

  const handleSendEvent = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (chat !== "") {
        sendChatEvent();
      }
    }
  };

  //소켓
  let webSocket = new WebSocket(
    `ws://localhost:8080/user/chat?${userData.email}`
  );

  webSocket.onopen = function (message) {
    console.log("오픈완료");
  };

  webSocket.onmessage = function (message) {
    console.log(message);
    setChatList(prev => [
      ...prev,
      {
        user: "client",
        message: String(message.data),
        time: new Date()
      }
    ]);
  };

  useEffect(() => {
    scrollDownEvent();
  }, [chatList]);

  return (
    <ChatBlock>
      <div className="content" ref={chatListRef}>
        {chatList.map((data, key) => (
          <div
            className={
              data.user === "client" ? "chatList client" : "chatList customer"
            }
            key={key}
          >
            <div
              className={data.user === "client" ? "msg client" : "msg customer"}
            >
              {data.message}
            </div>
          </div>
        ))}
      </div>
      <div className="chatRoom">
        <form className="chatItem">
          <textarea
            value={chat}
            maxLength={1024}
            placeholder="대화를 입력해주세요"
            onKeyPress={handleSendEvent}
            onChange={e => setChat(e.target.value)}
          />
          <div>
            <span style={{ cursor: "pointer" }}>전송</span>
          </div>
        </form>
      </div>
    </ChatBlock>
  );
}
const ChatBlock = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > .content {
    height: 465px;
    padding: 8px;
    overflow-y: scroll;

    & > .chatList {
      display: flex;
      align-items: center;
      & > .msg {
        max-width: 60%;
        border-radius: 8px;
        font-size: 14px;

        padding: 8px;
        margin: 4px;
      }
      & > .client {
        background-color: honeydew;
      }
      & > .customer {
        background-color: bisque;
      }
    }
    & > .client {
      justify-content: flex-start;
    }
    & > .customer {
      justify-content: flex-end;
    }
  }
  & > .chatRoom {
    padding: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    & > .chatItem {
      width: 100%;
      padding: 12px 8px;
      background-color: #f3f3f3;
      border-radius: 16px;

      display: flex;
      align-items: center;
      justify-content: space-between;
      & > textarea {
        flex: 1;
        height: 20px;

        border: none;
        background: none;
        resize: none;
      }
    }
  }
`;

export default Chat;
