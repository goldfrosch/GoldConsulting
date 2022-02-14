import { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import ChatItem from "components/common/chat/items";
import { IChat } from "constants/chatUserSampleList";

interface AdminChatProps {
  chats: IChat[];
}

function AdminChatModule({ chats }: AdminChatProps) {
  const [chat, setChat] = useState<string>("");
  const chatListRef = useRef<HTMLDivElement>(null);

  const scrollDownEvent = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight * 2;
    }
  };

  const handleSendEvent = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (chat !== "") {
        // sendChatEvent();
      }
    }
  };

  useEffect(() => {
    scrollDownEvent();
  }, [chats]);

  return (
    <AdminChatBlock>
      <div className="chatlist">
        {chats.map((data, key) => (
          <ChatItem
            owner={data.user}
            msg={data.message}
            user="admin"
            key={key}
          />
        ))}
      </div>
      <div className="input"></div>
    </AdminChatBlock>
  );
}

const AdminChatBlock = styled.div`
  width: 100%;
  height: 100%;

  padding: 0 16px;

  box-sizing: border-box;

  & > .chatlist {
    height: 80vh;
    overflow-y: scroll;
  }
  & > .input {
    height: 10vh;
  }
`;

export default AdminChatModule;
