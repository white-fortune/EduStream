import StreamElement from "./common/Stream.structure";
import { IStream, StreamType } from "../structures/types";

export default function Profile() {
  let streamList: IStream[] = [
    {
      id: crypto.randomUUID(),
      title: "Study With ME!",
      author: "John Doe",
      description: "Keep syncing your study",
      type: StreamType.Private,
    },
    {
      id: crypto.randomUUID(),
      title: "Sync Study",
      author: "Maria",
      description: "Let's start with chemistry",
      type: StreamType.Public,
    },
  ];

  return (
    <>
      {streamList.map(({ id, author, title, description, type }: IStream) => {
        return (
          <StreamElement
            id={id}
            author={author}
            description={description}
            title={title}
            type={type}
            key={id}
          />
        );
      })}
    </>
  );
}
