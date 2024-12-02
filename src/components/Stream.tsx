import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
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

const AddTaskModal = ({
  controlTitle,
  controlState,
  controlTask,
}: {
  controlTitle: [string, React.Dispatch<React.SetStateAction<string>>];
  controlState: [string, React.Dispatch<React.SetStateAction<string>>];
  controlTask: [any[], any];
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function addTask(title: any, state: any) {
    if (title === "") return;
    let newTask: Tasks = {
      id: crypto.randomUUID(),
      title: title,
      state: state,
      date: new Date(),
    };

    controlTask[1]((tasks: any) => {
      return tasks.concat(newTask);
    });

    controlTitle[1]("");
  }

  return (
    <div>
      <Button variant="outline-info" onClick={handleShow}>
        Add Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="lead">Task Title:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Task Title"
            value={controlTitle[0]}
            onChange={(e) => controlTitle[1](e.target.value)}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => {
              addTask(controlTitle[0], controlState[0]);
              handleClose();
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default function Stream() {
  let someTasks: Tasks[] = [
    {
      id: crypto.randomUUID(),
      title: "Chemistry: Quantum Numbers",
      state: State.OnGoing,
      date: new Date(),
    },
    {
      id: crypto.randomUUID(),
      title: "Physics: Chapter 2: Vector Calculus",
      state: State.Done,
      date: new Date(),
    },
    {
      id: crypto.randomUUID(),
      title: "Statistics: Chapter 2: Revision",
      state: State.BackLog,
      date: new Date(),
    },
  ];

  let { name } = useParams<{ name: string }>();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskState, setTaskState] = useState("On Going");
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
          />
        )}
      </div>
      <div className="list-group">
        {tasks.map(({ id, title, state, date }: Tasks) => {
          return (
            <a
              href="#"
              className="list-group-item list-group-item-action"
              aria-current="true"
              key={id}
            >
              <div className="d-flex">
                <div className="p-2">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    value=""
                    id="firstCheckbox"
                  />
                </div>
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
                  <div className="btn-group">
                    {state === State.BackLog ? (
                      <button className="btn btn-outline-success">
                        Start Task
                      </button>
                    ) : null}
                    <button className="btn btn-outline-danger">
                      Delete Task
                    </button>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}
