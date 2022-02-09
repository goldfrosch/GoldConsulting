export type UserArray = {
  [user: string]: UserChat[]
}

export interface UserChat {
  message: string,
  time: Date
}