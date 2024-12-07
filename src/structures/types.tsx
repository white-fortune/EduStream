export enum StreamType {
  Public="public",
  Private="private",
}

export interface IStream {
  stream_id: string;
  name: string;
  author: {
    display_name: string
  }
  description: string;
  stream_type: StreamType;
}

export enum State {
  Done = "done",
  OnGoing = "on-going",
  BackLog = "backlog",
}
export interface ITasks {
  task_id: string;
  title: string;
  state: State;
  description: string;
  date: Date;
}

export interface IAlert {
  id: string;
  message: string;
}
