import styled from "styled-components";

import AdminUserList from "./userList";

import "font/font.css";

interface AdminChatProps {}

function AdminChat() {
  return (
    <AdminChatBlock>
      <div className="header">asdf</div>
      <div className="content">
        <div className="list">
          <AdminUserList />
        </div>
        <div className="chat">asd</div>
      </div>
    </AdminChatBlock>
  );
}

const AdminChatBlock = styled.div`
  width: 100%;
  height: 100%;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  & > .header {
    height: 8%;
    background-color: #1ad02f;
    color: white;

    padding: 8px;
    font-size: 20px;
    font-weight: 700;

    display: flex;
    align-items: center;
  }
  & > .content {
    width: 100%;
    height: 92%;

    display: flex;
    & > .list {
      width: 30%;
      height: 100%;
      overflow-y: scroll;
      & > .userRoom {
        padding: 12px;
        border-bottom: 1px solid #a9a9a9;

        display: flex;
        align-items: center;
        justify-content: space-between;

        cursor: pointer;

        & > .user {
          width: 60%;
          & > .profile {
            font-family: "A16";
          }
          & > .msg {
            color: #8c8c8c;
            font-family: "A12";
            padding: 4px;
            padding-left: 16px;

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        & > .time {
          font-size: 14px;
          color: #898989;
        }
      }
    }
    & > .chat {
      flex: 1;
    }
  }
`;

export default AdminChat;
