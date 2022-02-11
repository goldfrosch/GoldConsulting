import { IUserInfo } from "types/AdminChat";

import styled from "styled-components";
import DateUtils from "utils/DateUtils";

interface AdminUserListProps {
  userList: IUserInfo[];
  viewUserChatList: (key: string) => void;
}
function AdminUserList({ userList, viewUserChatList }: AdminUserListProps) {
  return (
    <AdminUserListBlock>
      {userList.map((data, key) => (
        <div
          className="userRoom"
          key={key}
          onClick={() => viewUserChatList(data.key)}
        >
          <div className="user">
            <div className="profile">
              <span>{data.key}</span>
              {data.newMsg !== 0 && (
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
