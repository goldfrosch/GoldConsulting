import styled from "styled-components";

import { IUserData } from "./main";
import Button from "components/common/button";
import { ButtonThemeColor, ButtonThemeSize } from "styles/Palette";

import PhoneUtils from "utils/PhoneUtils";

interface IInfoData {
  desc: string;
  user: IUserData;
  setUser: React.Dispatch<React.SetStateAction<IUserData>>;
  check: () => void;
}

function Info({ desc, user, setUser, check }: IInfoData) {
  return (
    <InfoBlock>
      <span>{desc}</span>
      <div className="content">
        <input
          value={user.email}
          placeholder="이메일 입력"
          onChange={e => setUser({ ...user, email: e.target.value })}
        />
        <input
          value={PhoneUtils.GetPhone(user.phone)}
          placeholder="전화번호 입력"
          onChange={e => {
            console.log(e.target.value);
            setUser({ ...user, phone: e.target.value.replace(/[^0-9]/, "") });
          }}
        />
      </div>
      <div className="footer">
        <div className="menu">
          <Button
            theme={ButtonThemeColor.first}
            size={ButtonThemeSize.small}
            onClick={check}
          >
            하이
          </Button>
        </div>
        <div className="copyright">
          <span>Made By GoldFrosch</span>
        </div>
      </div>
    </InfoBlock>
  );
}

const InfoBlock = styled.div`
  padding: 16px;
  & > .content {
    & > input {
      width: 100%;
      border: 2px solid black;
      border-radius: 8px;

      margin: 8px 0;
      padding: 4px;
    }
  }
  & > .footer {
    padding: 4px;
    & > .menu {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    & > .copyright {
      font-size: 12px;
      color: #797979;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
export default Info;
