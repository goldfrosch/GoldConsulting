import { useRef, useState } from "react";
import { IMessageData, IUserInfo } from "types/AdminChat";

import styled from "styled-components";
import DateUtils from "utils/DateUtils";

const webSocketURL = `ws://localhost:8080/chat/admin`;
function AdminUserList() {
  //소켓이 켜져있을 경우에는 기존 let선언 데이터가 그대로 유지되더라...!
  const webSocket = useRef<WebSocket | null>(null);
  //let으로 할까했는데 어차피 불변성에도 속하지 않으니까 const로 했는데...
  //나중에 더 좋은게 뭔지 알아보도록 할 것
  const [userList, setUserList] = useState<IUserInfo[]>([]);

  const receiveMessage = (message: MessageEvent) => {
    let newData: IMessageData = JSON.parse(message.data);
    let newList: IUserInfo[] = userList;
    let findNum = newList.findIndex(data => data.key === newData.key);

    if (findNum === -1) {
      newList.unshift({
        key: newData.key,
        time: newData.time,
        message: newData.message,
        newMsg: 1
      });
    } else {
      let prevData = newList[findNum];
      newList.splice(findNum, 1);
      newList.unshift({
        ...prevData,
        message: newData.message,
        time: newData.time,
        newMsg: prevData.newMsg + 1
      });
    }

    setUserList([...newList]);
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
      {userList.map((data, key) => (
        <div className="userRoom" key={key}>
          <div className="user">
            <div className="profile">
              <span>{data.key}</span>
              {data.newMsg && (
                <div className="num">
                  {data.newMsg > 9 ? "9+" : data.newMsg}
                </div>
              )}
            </div>
            <div className="msg">{data.message}</div>
          </div>
          <span className="time">{DateUtils.getTime(data.time)}</span>
        </div>
      ))}
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
        display: flex;
        align-items: center;
        & > span {
          font-family: "A16";
        }
        & > .num {
          width: 16px;
          height: 16px;

          background-color: #e93232;
          color: white;

          font-size: 10px;
          border-radius: 50%;
          margin: 0 4px;
          padding: 4px;

          display: flex;
          align-items: center;
          justify-content: center;
        }
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
