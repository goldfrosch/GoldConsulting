import styled from "styled-components";

const ChatList = styled.div`
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
`;

export default ChatList;
