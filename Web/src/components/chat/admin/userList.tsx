import { IChatUser } from "constants/chatAdminUserList";
import styled from "styled-components";
import DateUtils from "utils/DateUtils";

interface IUserListProps {
  userList: IChatUser[];
}
function AdminUserList({ userList }: IUserListProps) {
  return (
    <AdminUserListBlock>
      {userList.map((data, key) => (
        <div className="userRoom" key={key}>
          <div className="user">
            <div className="profile">{data.nick}</div>
            <div className="msg">{data.msg}</div>
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
