import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { ITasks, State } from "../structures/types";
import Cookies from "js-cookie";

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
    ITasks[] | [],
    React.Dispatch<React.SetStateAction<ITasks[] | []>>
  ];
  controlDesc: [string, React.Dispatch<React.SetStateAction<string>>];
  streamName: string | undefined;
}) {
  let { stream_id } = useParams<{ stream_id: string }>();

  async function addTask(title: any, state: any) {
    if (title === "") return;

    let onGoingCount = controlTask[0].filter(
      (task) => task.state === State.OnGoing
    ).length;

    async function addTaskServer() {
      let taskData = new FormData();
      taskData.append("stream", stream_id!);
      taskData.append("title", controlTitle[0]);
      taskData.append("description", controlDesc[0]);
      taskData.append("state", controlState[0]);

      let response = await fetch("http://localhost:2000/api/addTask", {
        method: "POST",
        credentials: "include",
        body: taskData,
      });
      let data = await response.json();
      return data;
    }

    if (state === State.OnGoing) {
      if (onGoingCount === 0) {
        addTaskServer().then((task) => {
          console.log(task);
          controlTask[1]((tasks: any) => {
            return tasks.concat(task);
          });
        });
      }
    } else {
      addTaskServer().then((task) => {
        controlTask[1]((tasks: any) => {
          return tasks.concat(task);
        });
      });
    }
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
                  addTask(controlTitle[0], controlState[0]);
                }}
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
  let initialTasks: ITasks[] = [
    {
      task_id: "0",
      title: "",
      state: State.BackLog,
      description: "",
      date: new Date(),
    },
  ];

  const { stream_id } = useParams<{ stream_id: string }>();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskState, setTaskState] = useState("on-going");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState<ITasks[]>(initialTasks);
  const [follow, setFollow] = useState<boolean>(false);
  const [author, setAuthor] = useState<boolean>(false);
  const [name, setName] = useState("");
  const userID: string = Cookies.get("userID")!;

  useEffect(() => {
    fetch(`http://localhost:2000/api/getStreamMetaData?streamID=${stream_id}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
      });

    fetch(`http://localhost:2000/api/getTasks?streamID=${stream_id}`)
      .then((response) => response.json())
      .then((data) => {
        setTasks((prev_tasks) => {
          return prev_tasks?.concat(data);
        });
      });

    fetch(
      `http://localhost:2000/api/stream/isFollowed?userID=${userID}&streamID=${stream_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFollow(data.follow);
      });

    fetch(
      `http://localhost:2000/api/stream/isOwned?userID=${userID}&streamID=${stream_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setAuthor(data.own);
      });
  }, []);

  const popover = (title: string) => (
    <Popover id="popover-basic">
      <Popover.Body>
        <b>{title}</b>
      </Popover.Body>
    </Popover>
  );

  const ShowTitle = ({ children, title }: { children: any; title: string }) => (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover(title)}>
      {children}
    </OverlayTrigger>
  );

  function getTitle(title: string) {
    return title.length < 30 ? title : title.slice(0, 30) + "...";
  }

  async function followStream() {
    fetch(
      `http://localhost:2000/api/stream/follow?userID=${userID}&streamID=${stream_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        data.ok ? setFollow(true) : null;
      });
  }

  function unfollowStream() {
    fetch(
      `http://localhost:2000/api/stream/unfollow?userID=${userID}&streamID=${stream_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        data.ok ? setFollow(false) : null;
      });
  }

  async function deleteTask(id: string) {
    setTasks((tasks) => {
      return tasks.filter((task) => task.task_id !== id);
    });
    await fetch(`http://localhost:2000/api/task/delete?taskID=${id}`);
  }

  function markDone(id: string) {
    fetch(`http://localhost:2000/api/task/markDone?taskID=${id}`)
      .then((response) => response.json())
      .then((data) => {
        data.ok
          ? setTasks((tasks) => {
              return tasks.map((task) => {
                if (task.task_id == id)
                  return Object.assign({}, task, { state: State.Done });
                return task;
              });
            })
          : null;
      });
  }

  function startTask(id: string) {
    setTasks((tasks) => {
      let onGoingCount = tasks.filter((task) => task.state === State.OnGoing);
      return onGoingCount.length === 0
        ? tasks.map((task) => {
            if (task.task_id === id) {
              fetch(`http://localhost:2000/api/task/start?taskID=${id}`);
              return Object.assign({}, task, { state: State.OnGoing });
            }
            return task;
          })
        : tasks;
    });
  }

  return (
    <>
      <div className="d-flex">
        <div className="p-2 flex-grow-1">
          <h1 className="display-4">{name}</h1>
        </div>
        {!author ? (
          <div className="p-2">
            {!follow ? (
              <button className="btn btn-outline-info" onClick={followStream}>
                Follow Stream
              </button>
            ) : (
              <button
                className="btn btn-outline-danger"
                onClick={unfollowStream}
              >
                Unfollow
              </button>
            )}
          </div>
        ) : (
          <div className="p-2">
            <AddTaskModal
              controlTitle={[taskTitle, setTaskTitle]}
              controlState={[taskState, setTaskState]}
              controlTask={[tasks, setTasks]}
              controlDesc={[desc, setDesc]}
              streamName={name}
            />
          </div>
        )}
      </div>
      {tasks.length == 1 ? <h1>No tasks are added yet!</h1> : null}
      <div className="list-group">
        {tasks
          .filter((task) => task.task_id !== "0")
          .map(({ task_id, title, description, state, date }: ITasks) => {
            return (
              <div
                className="list-group-item list-group-item-action"
                aria-current="true"
                key={task_id}
              >
                <ShowTitle title={title}>
                  <div className="d-flex">
                    <div className="p-2 flex-grow-1">
                      <h6 className="mb-1">{getTitle(title)}</h6>
                    </div>
                    {new Date(date).toLocaleDateString()} at{" "}
                    {new Date(date).toLocaleTimeString()}
                  </div>
                </ShowTitle>

                <div className="d-flex">
                  <div className="p-2 flex-grow-1">
                    <small>
                      <b>State:</b> {getState(state)}
                      <br />
                    </small>
                  </div>

                  <div className="p-2">
                    <div className="btn-group">
                      <button
                        className="btn btn-success"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#" + task_id}
                        aria-expanded="false"
                      >
                        Desc
                      </button>

                      {author ? (
                        <>
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          />
                          <ul className="dropdown-menu">
                            {state === State.BackLog ? (
                              <li>
                                <a className="dropdown-item">
                                  <button
                                    className="btn btn-outline-info"
                                    onClick={() => startTask(task_id)}
                                  >
                                    Start Task
                                  </button>
                                </a>
                              </li>
                            ) : state === State.OnGoing ? (
                              <li>
                                <a className="dropdown-item">
                                  <button
                                    className="btn btn-outline-success"
                                    onClick={() => markDone(task_id)}
                                  >
                                    Mark Done
                                  </button>
                                </a>
                              </li>
                            ) : null}

                            <li>
                              <a className="dropdown-item">
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() => deleteTask(task_id)}
                                >
                                  Delete Task
                                </button>
                              </a>
                            </li>
                          </ul>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="collapse" id={task_id}>
                  <div className="card card-body">{description}</div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
