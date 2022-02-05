import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

interface ChatItemProps {
  user: "client" | "customer";
  message: string;
  time: Date;
}

interface IChat {}
function Chat({}: IChat) {
  const [chat, setChat] = useState<string>("");
  const [chatList, setChatList] = useState<ChatItemProps[]>([
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
    let newChat: ChatItemProps[] = chatList;
    newChat.push({
      user: "customer",
      message: chat,
      time: new Date()
    });
    //비동기로 처리되느라고 이놈이 처리되기 이전에 맨 밑으로 스크롤이 움직이는 이벤트가
    //발생하기 때문에 동기로 처리되게 변경해둠.
    //퉤...
    await setChatList(newChat);
    setChat("");
    scrollDownEvent();
  };

  const handleSendEvent = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (chat !== "") {
        sendChatEvent();
      }
    }
  };

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
    padding: 0 8px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      background: #ffffff;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: #ced4da;
      &:hover {
        background-color: #adb5bd;
      }
    }

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
