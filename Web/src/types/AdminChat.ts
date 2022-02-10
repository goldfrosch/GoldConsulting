export type IUserArray = {
  //인덱스 시그니쳐
  [user: string]: IUserInfo;
}

export interface IMessageData extends IUserData {
  status: "MESSAGE" | "LEAVE"
  key: string,
}

export interface IUserData {
  message: string,
  time: Date,
}

export interface IUserInfo extends IUserData {
  newMsg: number,
}

export interface UserChat {
  message: string,
  time?: Date
}