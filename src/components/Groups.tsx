import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Stream from "./Stream";

enum GroupType {
  Public,
  Private,
}
interface Stream {
  id: string;
  title: string;
  author: string;
  description: string;
  type: GroupType;
}

const SearchPanel = ({
  groupName,
  groups,
}: {
  groupName: any;
  groups: any;
}) => {
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
  groups,
}: {
  groupTitle: any;
  groupDesc: any;
  groupType: any;
  groups: any;
}) => {
  function createGroup(
    title: any,
    author: any,
    description: string,
    type: any
  ) {
    if (title === "") return;
    let newTask: Stream = {
      id: crypto.randomUUID(),
      title: title,
      description: description,
      author: author,
      type: type,
    };

    groups[1]((tasks: any) => {
      return tasks.concat(newTask);
    });

    groupTitle[1]("");
  }

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
                onClick={() =>
                  createGroup(
                    groupTitle[0],
                    "John Doe",
                    groupDesc[0],
                    groupType
                  )
                }
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
      type: GroupType.Private,
    },
    {
      id: crypto.randomUUID(),
      title: "Sync Study",
      author: "Maria",
      description: "Let's start with chemistry",
      type: GroupType.Public,
    },
  ];

  const [groupName, setGroupName] = useState("");
  const [groupTitle, setGroupTitle] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [groupType, setGroupType] = useState("private");
  const [groups, setGroups] = useState(streamList);
  const navigate = useNavigate();

  function goToStream(streamID: string) {
    navigate(`/stream/${streamID}`);
  }

  return (
    <>
      <SearchPanel
        groupName={[groupName, setGroupName]}
        groups={[groups, setGroups]}
      />
      <CreateGroupModal
        groupTitle={[groupTitle, setGroupTitle]}
        groupDesc={[groupDesc, setGroupDesc]}
        groupType={[groupType, setGroupType]}
        groups={[groups, setGroups]}
      />

      <div className="list-group">
        {groups.map(({ id, title, author, description }: Stream) => {
          return (
            <div
              className="card text-left"
              style={{ marginTop: "20px" }}
              key={id}
            >
              <div className="card-header">Group by {author}</div>
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a
                  onClick={() => goToStream(title)}
                  className="btn btn-outline-success"
                >
                  Go to stream
                </a>
              </div>
              <div className="card-footer text-body-secondary">
                Staus: <span className="badge text-bg-success">Followed</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
