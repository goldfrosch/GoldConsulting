import styled from "styled-components";

interface AdminChatProps {
  userKey: string;
}

function AdminChatModule({ userKey }: AdminChatProps) {
  return <AdminChatBlock></AdminChatBlock>;
}

const AdminChatBlock = styled.div``;

export default AdminChatModule;
