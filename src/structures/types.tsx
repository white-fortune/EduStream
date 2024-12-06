export enum StreamType {
  Public,
  Private,
}

export interface IStream {
  id: string;
  title: string;
  author: string;
  description: string;
  type: StreamType;
}

export enum State {
  Done = "Done",
  OnGoing = "On Going",
  BackLog = "Back Log",
}
export interface ITasks {
  id: string;
  title: string;
  state: State;
  description: string;
  date: Date;
}

export interface IAlert {
  id: string;
  message: string;
}
