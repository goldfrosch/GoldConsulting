import styled from "styled-components";

interface IChat {}
function Chat({}: IChat) {
  return (
    <ChatBlock>
      <div className="content">asd</div>
      <form className="chat">
        <textarea maxLength={1024} />
      </form>
    </ChatBlock>
  );
}
const ChatBlock = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  & > .content {
    flex: 1;
  }
  & > .chat {
    width: 100%;
    min-height: 36px;
    max-height: 128px;
    padding: 8px;
    background-color: #f3f3f3;
    border-radius: 16px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    & > textarea {
      flex: 1;
      min-height: 36px;
      max-height: 128px;
      border: none;
      resize: vertical;
    }
  }
`;

export default Chat;
