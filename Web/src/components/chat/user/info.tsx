import styled from "styled-components";
import { IUserData } from "./main";

interface IInfoData {
  desc: string;
  user: IUserData;
  setUser: React.Dispatch<React.SetStateAction<IUserData>>;
}

function Info({ desc, user, setUser }: IInfoData) {
  return (
    <InfoBlock>
      <span>{desc}</span>
      <input
        value={user.email}
        placeholder="이메일 입력"
        onChange={e => setUser({ ...user, email: e.target.value })}
      />
      <input
        value={user.email}
        placeholder="전화번호 입력"
        onChange={e => setUser({ ...user, phone: e.target.value })}
      />
    </InfoBlock>
  );
}

const InfoBlock = styled.div`
  padding: 16px;
  & > input {
    width: 100%;
    border: 2px solid black;
    border-radius: 8px;

    margin: 4px 0;
    padding: 4px;
  }
`;
export default Info;
