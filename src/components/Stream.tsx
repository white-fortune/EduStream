import { useParams } from "react-router-dom";
import { useState } from "react";

enum State {
  Done = "Done",
  OnGoing = "On Going",
  BackLog = "Back Log",
}
interface Tasks {
  id: string;
  title: string;
  state: State;
  description: string;
  date: Date;
}

function getState(state: State) {
  switch (state) {
    case State.Done:
      return <span className="badge text-bg-success">{State.Done}</span>;
    case State.OnGoing:
      return <span className="badge text-bg-danger">{State.OnGoing}</span>;
    case State.BackLog:
      return <span className="badge text-bg-secondary">{State.BackLog}</span>;
  }
}

function AddTaskModal({
  controlTitle,
  controlState,
  controlTask,
  controlDesc,
  streamName,
}: {
  controlTitle: [string, React.Dispatch<React.SetStateAction<string>>];
  controlState: [string, React.Dispatch<React.SetStateAction<string>>];
  controlTask: [
    Tasks[] | [],
    React.Dispatch<React.SetStateAction<Tasks[] | []>>
  ];
  controlDesc: [string, React.Dispatch<React.SetStateAction<string>>];
  streamName: string | undefined;
}) {
  function addTask(title: any, state: any, description: string) {
    if (title === "") return;
    let newTask: Tasks = {
      id: crypto.randomUUID(),
      title: title,
      state: state,
      description: description,
      date: new Date(),
    };

    controlTask[1]((tasks: any) => {
      return tasks.concat(newTask);
    });

    controlTitle[1]("");
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Task
      </button>

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
                Add Task to <b>{streamName}</b>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label className="lead">Task Title:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Task Title"
                value={controlTitle[0]}
                onChange={(e) => controlTitle[1](e.target.value)}
              />
              <br />
              <label className="lead">Task Description:</label>
              <textarea
                className="form-control"
                placeholder="Tell Something about the task, like the resources you will look into, or some tips!"
                value={controlDesc[0]}
                onChange={(e) => controlDesc[1](e.target.value)}
              />
              <br />
              <label className="lead">State:</label>
              <select
                className="form-select"
                value={controlState[0]}
                onChange={(e) => controlState[1](e.target.value)}
              >
                <option value={State.OnGoing}>On Going</option>
                <option value={State.BackLog}>BackLog</option>
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
                onClick={() => {
                  addTask(controlTitle[0], controlState[0], controlDesc[0]);
                }}
                data-bs-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Stream() {
  let someTasks: Tasks[] = [
    {
      id: crypto.randomUUID(),
      title: "Chemistry: Quantum Numbers",
      state: State.OnGoing,
      description: "This is something!",
      date: new Date(),
    },
    {
      id: crypto.randomUUID(),
      title: "Physics: Chapter 2: Vector Calculus",
      state: State.Done,
      description: "This is something!",
      date: new Date(),
    },
    {
      id: crypto.randomUUID(),
      title: "Statistics: Chapter 2: Revision",
      state: State.BackLog,
      description: "This is something!",
      date: new Date(),
    },
  ];

  const { name } = useParams<{ name: string }>();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskState, setTaskState] = useState("On Going");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState<Tasks[]>(someTasks);

  let author: boolean = true;

  return (
    <>
      <div className="d-flex">
        <div className="p-2 flex-grow-1">
          <h1 className="display-4">{name}</h1>
        </div>
        {!author ? (
          <div className="p-2">
            <button className="btn btn-outline-info">Follow Stream</button>
          </div>
        ) : (
          <AddTaskModal
            controlTitle={[taskTitle, setTaskTitle]}
            controlState={[taskState, setTaskState]}
            controlTask={[tasks, setTasks]}
            controlDesc={[desc, setDesc]}
            streamName={name}
          />
        )}
      </div>
      {tasks.length !== 0 ? true : <h1>No tasks are added yet!</h1>}
      <div className="list-group">
        {tasks.map(({ id, title, description, state, date }: Tasks) => {
          return (
            <div
              // href="#"
              className="list-group-item list-group-item-action"
              aria-current="true"
              key={id}
            >
              <div className="d-flex">
                <div className="p-2 flex-grow-1">
                  <h5 className="mb-1">{title}</h5>
                </div>
                {date.toLocaleDateString()} at {date.toLocaleTimeString()}
              </div>

              <div className="d-flex">
                <div className="p-2 flex-grow-1">
                  <small>
                    <b>State:</b> {getState(state)}
                    <br />
                  </small>
                </div>

                <div className="p-2">
                  <div className="dropdown">
                    <div className="btn-group">
                      <button
                        className="btn btn-success"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#" + id}
                        aria-expanded="false"
                      >
                        Desc
                      </button>
                    </div>
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Actions
                    </button>
                    <ul className="dropdown-menu">
                      {state === State.BackLog ? (
                        <li>
                          <a className="dropdown-item">
                            <button className="btn btn-outline-info">
                              Start Task
                            </button>
                          </a>
                        </li>
                      ) : state === State.OnGoing ? (
                        <li>
                          <a className="dropdown-item">
                            <button className="btn btn-outline-success">
                              Mark Done
                            </button>
                          </a>
                        </li>
                      ) : null}

                      <li>
                        <a className="dropdown-item">
                          <button className="btn btn-outline-danger">
                            Delete Task
                          </button>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="collapse" id={id}>
                <div className="card card-body">{description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
