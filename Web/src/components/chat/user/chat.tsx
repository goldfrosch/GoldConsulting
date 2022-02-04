import React, { useRef, useState } from "react";
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
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  const sendChatEvent = () => {
    let newChat: ChatItemProps[] = chatList;
    newChat.push({
      user: "customer",
      message: chat,
      time: new Date()
    });
    setChatList(newChat);
    setChat("");
  };

  const handleSendEvent = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
      } else {
        e.preventDefault();
        sendChatEvent();
      }
    }
  };

  return (
    <ChatBlock>
      <div className="content">
        {chatList.map((data, key) => (
          <div
            className={
              data.user === "client" ? "chatList client" : "chatList customer"
            }
          >
            <div
              className={data.user === "client" ? "msg client" : "msg customer"}
              key={key}
            >
              {data.message}
            </div>
          </div>
        ))}
      </div>
      <form className="chat">
        <textarea
          value={chat}
          maxLength={1024}
          ref={chatInputRef}
          placeholder="대화를 입력해주세요"
          onKeyPress={handleSendEvent}
          onChange={e => setChat(e.target.value)}
        />
        <div>
          <span style={{ cursor: "pointer" }}>전송</span>
        </div>
      </form>
    </ChatBlock>
  );
}
const ChatBlock = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  padding: 8px;

  & > .content {
    flex: 1;
    & > .chatList {
      display: flex;
      align-items: center;
      & > .msg {
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
      text-align: right;
    }
  }
  & > .chat {
    width: 100%;
    padding: 12px 8px;
    background-color: #f3f3f3;
    border-radius: 16px;

    display: flex;
    justify-content: space-between;
    & > textarea {
      flex: 1;
      height: 20px;

      border: none;
      background: none;
      resize: none;
    }
  }
`;

export default Chat;
