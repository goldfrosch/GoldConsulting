export interface IChat {
  user: "client" | "customer";
  message: string;
  time: Date;
}
