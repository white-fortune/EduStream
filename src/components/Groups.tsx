import { useNavigate } from "react-router-dom";
import "./Groups.css";

interface Stream {
  id: string;
  title: string;
  author: string;
  description: string;
}

export default function Groups() {
  let streamList: Stream[] = [
    {
      id: crypto.randomUUID(),
      title: "Study With ME!",
      author: "John Doe",
      description: "Keep syncing your study",
    },
    {
      id: crypto.randomUUID(),
      title: "Sync Study",
      author: "Maria",
      description: "Let's start with chemistry",
    },
  ];

  let navigate = useNavigate();
  function goToStream(streamID: string) {
    navigate(`/stream/${streamID}`);
  }

  return (
    <>
      {streamList.map(({ id, title, author, description }: Stream) => {
        return (
          <div className="card">
            <p className="display-6">{title}</p>
            <h3 className="card__title">Author: {author}</h3>
            <p className="card__content">{description}</p>
            {/* <div className="card__state">
            <span className="badge text-bg-success">Followed</span>
          </div> */}
            <div className="card__arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                height="15"
                width="15"
                onClick={() => {
                  goToStream(title);
                }}
              >
                <path
                  fill="#fff"
                  d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
                ></path>
              </svg>
            </div>
          </div>
        );
      })}
    </>
  );
}
