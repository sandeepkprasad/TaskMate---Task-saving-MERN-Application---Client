import React, { useContext, useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import taskContext from "../context/taskContext";
import EditModal from "./EditModal";

const FetchTask = () => {
  const { tasks, getTask, loading, getModal } = useContext(taskContext);
  const [task, setTask] = useState({ id: "", etask: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (localStorage.getItem("taskmate-token")) {
      getTask();
    }
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="h-[50vh] font-bold text-xl text-center tracking-wider">
        <span>
          {localStorage.getItem("taskbox-token")
            ? "Loading..."
            : "Please Login"}
        </span>
      </div>
    );
  }

  const updateTask = (currItem) => {
    getModal(true);
    setTask({ id: currItem._id, etask: currItem.task });
  };

  return (
    <>
      <EditModal task={task} setTask={setTask} />
      <div className="w-full h-auto flex justify-center py-10">
        <div className="w-full md:w-1/3 text-center space-y-5 border-2 border-slate-100 bg-rose-200 rounded-lg py-5 mx-5 md:mx-0">
          <div className="w-full">
            <form
              role="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            >
              <input
                className="p-1 border-2 border-rose-200 rounded-lg shadow"
                type="search"
                placeholder="Search your task"
                aria-label="Search"
              />
            </form>
          </div>
          {tasks &&
            tasks
              .slice(0)
              .reverse()
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.task.toLowerCase().includes(search);
              })
              .map((currItem) => {
                return (
                  <TaskItem
                    item={currItem}
                    key={currItem._id}
                    updateTask={updateTask}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
};

export default FetchTask;
