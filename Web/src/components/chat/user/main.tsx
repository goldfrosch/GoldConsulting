import React, { useState } from "react";
import styled from "styled-components";

import chat from "../../../assets/icon/chat.png";

interface IUserChat {}
const UserChat: React.FC<IUserChat> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(0);

  return (
    <UserChatBlock>
      <div className="chatting">
        <div className="icon" onClick={() => setIsOpen(!isOpen)}>
          <img src={chat} alt="chat-icon" />
        </div>
        <section className={isOpen ? "item" : "item deactive"}>
          <div className="content">
            <div className="header">
              <span>어쩔티비</span>
            </div>
          </div>
        </section>
      </div>
    </UserChatBlock>
  );
};

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
      & > .content {
        height: 100%;
        display: block;
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
        }
      }
    }
    & > .deactive {
      height: 0;
      & > .content {
        display: none;
      }
    }
  }
`;

export default UserChat;
