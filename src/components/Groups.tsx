import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Stream {
  id: string;
  title: string;
  author: string;
  description: string;
}

const SearchPanel = ({ groupName }: { groupName: any }) => {
  return (
    <div className="input-group mb-3" style={{ marginTop: "20px" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Group Name"
        value={groupName[0]}
        onChange={(e) => groupName[1](e.target.value)}
      />
      <div className="btn-group">
        <button className="btn btn-outline-secondary" type="button">
          Search
        </button>
        <button
          className="btn btn-outline-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

const CreateGroupModal = ({
  groupTitle,
  groupDesc,
  groupType,
}: {
  groupTitle: any;
  groupDesc: any;
  groupType: any;
}) => {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Track your progress!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <label className="lead">Group Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Task Title"
                value={groupTitle[0]}
                onChange={(e) => groupTitle[1](e.target.value)}
              />
              <br />
              <label className="lead">Group Description:</label>
              <textarea
                className="form-control"
                placeholder="Write less please!!"
                value={groupDesc[0]}
                onChange={(e) => groupDesc[1](e.target.value)}
              />
              <br />
              <label className="lead">Type:</label>
              <select
                className="form-select"
                value={groupType[0]}
                onChange={(e) => groupType[1](e.target.value)}
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

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

  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [groupTitle, setGroupTitle] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [groupType, setGroupType] = useState("private");

  function goToStream(streamID: string) {
    navigate(`/stream/${streamID}`);
  }

  return (
    <>
      <SearchPanel groupName={[groupName, setGroupName]} />
      <CreateGroupModal
        groupTitle={[groupTitle, setGroupTitle]}
        groupDesc={[groupDesc, setGroupDesc]}
        groupType={[groupType, setGroupType]}
      />

      <div className="list-group">
        {streamList.map(({ id, title, author, description }: Stream) => {
          return (
            <div
              className="list-group-item list-group-item-action"
              aria-current="true"
              style={{ marginBottom: "20px" }}
              key={id}
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">
                  {title} by <a>{author}</a>
                </h5>
                <small>3 days ago</small>
              </div>
              <p className="mb-1">{description}</p>
              <div className="d-flex">
                <div className="p-2 flex-grow-1">
                  <span className="badge text-bg-success">Followed</span>
                </div>
                <div className="p-2">
                  <button
                    className="btn btn-outline-success"
                    onClick={() => goToStream(title)}
                  >
                    Go to stream
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
