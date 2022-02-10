import { useRef, useState } from "react";
import { IMessageData, IUserArray, IUserData } from "types/AdminChat";

import styled from "styled-components";

interface IUserListProps {
  userList?: IUserArray;
}

const webSocketURL = `ws://localhost:8080/chat/admin`;
function AdminUserList({ userList }: IUserListProps) {
  //소켓이 켜져있을 경우에는 기존 let선언 데이터가 그대로 유지되더라...!
  const webSocket = useRef<WebSocket | null>(null);
  const userLists: IUserArray = {};

  const receiveMessage = (message: MessageEvent) => {
    let newData: IMessageData = JSON.parse(message.data);

    if (userLists[newData.key]) {
      userLists[newData.key] = {
        newMsg: userLists[newData.key].newMsg + 1,
        message: newData.message,
        time: newData.time
      };
    } else {
      userLists[newData.key] = {
        newMsg: 1,
        message: newData.message,
        time: newData.time
      };
    }

    console.log(userLists);
  };

  if (!webSocket.current) {
    webSocket.current = new WebSocket(webSocketURL);

    const { current } = webSocket;
    current.onopen = function () {
      console.log("연결 성공");
    };

    current.onmessage = function (message) {
      //소켓 서버가 열려 있을 경우에 메세지가 밀려 새로 서버 연결시에
      //문제가 생겨서 계속 onMessage이벤트가 실행될 수 있다.
      //그 경우에는 서버를 껏다키면 되니...
      receiveMessage(message);
    };
  }

  return (
    <AdminUserListBlock>
      {/* {userList.map((data, key) => (
        <div className="userRoom" key={key}>
          <div className="user">
            <div className="profile">{data.nick}</div>
            <div className="msg">{data.msg}</div>
          </div>
          <span className="time">{DateUtils.getTime(data.time)}</span>
        </div>
      ))} */}
    </AdminUserListBlock>
  );
}

const AdminUserListBlock = styled.div`
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
`;

export default AdminUserList;
