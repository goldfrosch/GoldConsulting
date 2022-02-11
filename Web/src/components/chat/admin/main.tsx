import { useRef, useState } from "react";
import styled from "styled-components";
import { IMessageData, IUserInfo } from "types/AdminChat";
import AdminUserList from "./adminList";

import "font/font.css";
import AdminChatModule from "./adminChat";
import { IChat } from "constants/chatUserSampleList";

interface AdminChatProps {}
interface IAdminData {
  userKey: string;
  list: IUserInfo[];
  chats: IChat[];
}

const webSocketURL = `ws://localhost:8080/chat/admin`;
function AdminChat() {
  //소켓이 켜져있을 경우에는 기존 let선언 데이터가 그대로 유지되더라...!
  const webSocket = useRef<WebSocket | null>(null);
  //let으로 할까했는데 어차피 불변성에도 속하지 않으니까 const로 했는데...
  //나중에 더 좋은게 뭔지 알아보도록 할 것
  const [adminData, setAdminData] = useState<IAdminData>({
    userKey: "",
    list: [],
    chats: []
  });

  const [userList, setUserList] = useState<IUserInfo[]>([]);
  const [userChatList, setUserChatList] = useState<IChat[]>([]);
  const [userKey, setUserKey] = useState<string>("");

  const viewUserChatList = (key: string) => {
    let datas: IUserInfo[] = userList;
    let findNum = datas.findIndex(data => data.key === key);

    datas[findNum].newMsg = 0;

    setAdminData({
      userKey: key,
      list: [...datas],
      chats: []
    });
  };

  const getChatWithUser = (data: IMessageData) => {
    if (data.key === userKey) {
      setUserChatList(prev => [
        ...prev,
        {
          user: "customer",
          message: data.message,
          time: new Date()
        }
      ]);
      console.log(userChatList);
    }
  };

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

    setAdminData(prev => {
      return {
        ...prev,
        list: newList
      };
    });
    getChatWithUser(newData);
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
    <AdminChatBlock>
      <div className="header">asdf</div>
      <div className="content">
        <div className="list">
          <AdminUserList
            userList={userList}
            viewUserChatList={viewUserChatList}
          />
        </div>
        <div className="chat">
          {userKey !== "" && <AdminChatModule userKey={adminData.userKey} />}
        </div>
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
