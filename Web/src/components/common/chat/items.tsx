import styled from "styled-components";

interface ChatOwnerType {
  user: "admin" | "user";
  owner: "client" | "customer";
}

interface ChatItemProps extends ChatOwnerType {
  msg: string;
}

function ChatItem({ user, owner, msg }: ChatItemProps) {
  return (
    <ChatItemBlock owner={owner} user={user}>
      <div className="msg">{msg}</div>
    </ChatItemBlock>
  );
}

const ChatItemBlock = styled.div<ChatOwnerType>`
  display: flex;
  align-items: center;

  justify-content: ${props =>
    props.user === "admin"
      ? props.owner === "customer"
        ? "flex-start"
        : "flex-end"
      : props.owner === "client"
      ? "flex-start"
      : "flex-end"};
  & > .msg {
    max-width: 60%;
    border-radius: 8px;
    font-size: 14px;

    padding: 8px;
    margin: 4px;

    background-color: ${props =>
      props.user === "admin"
        ? props.owner === "customer"
          ? "honeydew"
          : "bisque"
        : props.owner === "client"
        ? "honeydew"
        : "bisque"};
  }
`;

export default ChatItem;
