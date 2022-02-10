export type IUserArray = {
  //인덱스 시그니쳐
  [user: string]: IUserInfo;
}

export interface IMessageData extends IUserData {
  status: "MESSAGE" | "LEAVE"
}

export interface IUserData {
  message: string,
  time: Date,
  key: string,
}

export interface IUserInfo extends IUserData {
  newMsg: number,
}

export interface UserChat {
  message: string,
  time?: Date
}