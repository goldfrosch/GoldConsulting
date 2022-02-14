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

  const viewUserChatList = (key: string) => {
    let datas: IAdminData = adminData;
    let findNum = datas.list.findIndex(data => data.key === key);

    datas.list[findNum].newMsg = 0;
    datas.chats = datas.userKey === key ? [...datas.chats] : [];
    setAdminData({
      userKey: key,
      list: [...datas.list],
      chats: [...datas.chats]
    });
  };

  const receiveMessage = (message: MessageEvent) => {
    let newData: IMessageData = JSON.parse(message.data);
    let newList: IUserInfo[] = adminData.list;
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

    setAdminData(prev =>
      newData.key === prev.userKey
        ? {
            ...prev,
            list: newList,
            chats: [
              ...prev.chats,
              {
                user: "customer",
                message: newData.message,
                time: newData.time
              }
            ]
          }
        : {
            ...prev,
            list: newList
          }
    );
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
            userList={adminData.list}
            viewUserChatList={viewUserChatList}
          />
        </div>
        <div className="chat">
          {adminData.userKey !== "" && (
            <AdminChatModule chats={adminData.chats} />
          )}
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
    height: 10vh;
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
    height: 90vh;

    display: flex;
    & > .list {
      width: 30%;
      height: 100%;
      overflow-y: auto;
      border-right: 1px solid #a9a9a9;
    }
    & > .chat {
      width: 40%;
      height: 100%;
    }
  }
`;

export default AdminChat;
