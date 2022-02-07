import { FormEvent, useState } from "react";
import styled from "styled-components";

import Info from "./info";
import { desc } from "constants/desc";

import chat from "assets/icon/chat.png";
import cancel from "assets/icon/x.png";

import CheckUtils from "utils/CheckUtils";
import Chat from "./chat";

interface IUserChat {
  title: string;
}
export interface IUserData {
  email: string;
  phone: string;
}
//React.FC 사용 하지 않는 것을 권장하는 이유
//요약하자면 매개 변수에 직접 props를 사용하면 구성 요소를보다 정확하게 입력하고
//오탐을 방지하는 동시에 유연성을 높일 수 있다는 것이다.
//특정 라이브러리, 프레임웤에서 요구하는 방법이 아니라,
//Typescript 자체의 타이핑의 관례를 따르는 게 좋다는 것이 상식이기도 하다.
//동시에 React.FC를 안쓰면 React import를 안해도 되니 더 좋은듯 하다.
function UserChat({ title }: IUserChat) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChat, setIsChat] = useState<boolean>(false);
  const [user, setUser] = useState<IUserData>({
    email: "",
    phone: ""
  });

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const backToMain = () => {
    setUser({
      email: "",
      phone: ""
    });
    setIsChat(false);
  };
  const enterConsultRoom = (e: FormEvent) => {
    e.preventDefault();
    if (user.email === "" || user.phone === "") {
      alert("이메일과 전화번호 입력은 필수입니다");
    } else {
      if (CheckUtils.VerifyEmail(user.email)) {
        setIsChat(true);
      } else {
        alert("이메일 형식을 제대로 입력해주세요");
      }
    }
  };

  return (
    <UserChatBlock>
      <div className="chatting">
        <div className="icon" onClick={toggleOpen}>
          <img src={chat} alt="chat-icon" />
        </div>
        <section className={isOpen ? "item" : "item deactive"}>
          <div className="main">
            <div className={isChat ? "header options" : "header"}>
              <div>
                {isChat && (
                  <span
                    onClick={backToMain}
                    style={{ cursor: "pointer" }}
                  >{`< `}</span>
                )}
                <span>{title}</span>
              </div>
              <img src={cancel} alt="cancel-icon" onClick={toggleOpen} />
            </div>
            <div className="content">
              {isChat ? (
                <Chat />
              ) : (
                <Info
                  desc={desc}
                  user={user}
                  setUser={setUser}
                  check={enterConsultRoom}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </UserChatBlock>
  );
}

const UserChatBlock = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;

  z-index: 999999;

  & > .chatting {
    width: 64px;
    height: 64px;
    background-color: #ffea71;
    box-shadow: rgba(0.75, 0.75, 0.75, 0.08) 0px -23px 25px 0px inset,
      rgba(0.75, 0.75, 0.75, 0.07) 0px -36px 30px 0px inset,
      rgba(0.75, 0.75, 0.75, 0.05) 0px -79px 40px 0px inset,
      rgba(0.75, 0.75, 0.75, 0.03) 0px 2px 1px,
      rgba(0.75, 0.75, 0.75, 0.045) 0px 4px 2px,
      rgba(0.75, 0.75, 0.75, 0.045) 0px 8px 4px,
      rgba(0.75, 0.75, 0.75, 0.045) 0px 16px 8px,
      rgba(0.75, 0.75, 0.75, 0.045) 0px 32px 16px;

    margin: 16px;
    border-radius: 50%;

    position: relative;

    cursor: pointer;
    & > .icon {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 100%;

      & > img {
        width: 75%;
        height: 75%;
      }
    }
    & > section {
      width: 320px;
      height: 560px;
      background-color: white;

      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      border-radius: 8px;

      position: absolute;
      bottom: 72px;
      right: 16px;

      cursor: default;
      transition-property: height;
      transition-duration: 0.25s;
      & > .main {
        height: 100%;
        display: flex;
        flex-direction: column;
        & > .header {
          width: 100%;
          height: 7.5%;
          background-color: green;
          color: white;

          font-size: 20px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border-radius: 8px 8px 0 0;

          padding: 8px;
          & > img {
            width: 12px;
            height: 16px;

            cursor: pointer;
          }
        }
        & > .options {
          height: 6.5%;
          font-size: 16px;
        }
        & > .content {
          flex: 1;
        }
      }
    }
    & > .deactive {
      height: 0;
      & > .main {
        display: none;
      }
    }
  }
`;

export default UserChat;
