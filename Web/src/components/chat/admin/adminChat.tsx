import ChatItem from "components/common/chat/items";
import { IChat } from "constants/chatUserSampleList";
import styled from "styled-components";

interface AdminChatProps {
  userKey: string;
  chats: IChat[];
}

function AdminChatModule({ userKey, chats }: AdminChatProps) {
  return (
    <AdminChatBlock>
      {chats.map((data, key) => (
        <ChatItem owner={data.user} msg={data.message} user="admin" key={key} />
      ))}
    </AdminChatBlock>
  );
}

const AdminChatBlock = styled.div`
  width: 100%;
  height: 100%;
`;

export default AdminChatModule;
