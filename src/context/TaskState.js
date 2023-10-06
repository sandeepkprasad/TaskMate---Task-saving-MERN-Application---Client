import { useState } from "react";
import taskContext from "./taskContext";

const TaskState = (props) => {
  const [mode, setMode] = useState("light");
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);

  // Get User Name
  const getUser = async () => {
    let url = "http://localhost:5000/auth/getuser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("taskmate-token"),
      },
    });

    const json = await response.json();
    setUser(json);
  };

  // Get Tasks
  const getTask = async () => {
    let url = "http://localhost:5000/task/gettask";

    setLoading(true);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("taskmate-token"),
      },
    });

    const json = await response.json();
    setLoading(false);
    setTasks(json);
  };

  // Add Task
  const addTask = async (task) => {
    let url = "http://localhost:5000/task/addtask";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("taskmate-token"),
      },
      body: JSON.stringify({ task: task }),
    });

    const json = await response.json();
    setTasks(tasks.concat(json));
  };

  // Edit note
  const editTask = async (id, task) => {
    let url = `http://localhost:5000/task/updatetask/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("taskmate-token"),
      },
      body: JSON.stringify({ task }),
    });
    const json = await response.json();
    //Logic to edit in client.
    const newTasks = JSON.parse(JSON.stringify(tasks));
    for (let i = 0; i < tasks.length; i++) {
      const element = tasks[i];
      if (element._id === id) {
        newTasks[i].task = task;
        break;
      }
    }
    setTasks(newTasks);
  };

  // Delete Task
  const deleteTask = async (id) => {
    let url = `http://localhost:5000/task/deletetask/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("taskmate-token"),
      },
    });

    // eslint-disable-next-line
    const json = await response.json();

    const newTasks = tasks.filter((item) => {
      return item._id !== id;
    });

    setTasks(newTasks);
  };

  const setUIMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#154360";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const getModal = (data) => {
    setModal(data);
  };

  return (
    <taskContext.Provider
      value={{
        mode,
        setUIMode,
        user,
        getUser,
        tasks,
        getTask,
        loading,
        addTask,
        editTask,
        deleteTask,
        modal,
        getModal,
      }}
    >
      {props.children}
    </taskContext.Provider>
  );
};

export default TaskState;
