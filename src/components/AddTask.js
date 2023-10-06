import React, { useContext, useState } from "react";
import taskContext from "../context/taskContext";

const AddTask = () => {
  const [addtask, setAddtask] = useState({ task: "" });
  const { addTask } = useContext(taskContext);

  const handleChange = (e) => {
    setAddtask({ ...addtask, [e.target.name]: e.target.value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    addTask(addtask.task);
    setAddtask({ task: "" });
  };

  return (
    <div className="w-full h-[50px] flex justify-center items-center">
      <div className="w-fit flex justify-center">
        <form
          onSubmit={handleAddTask}
          className="flex justify-center space-x-5"
        >
          <input
            type="text"
            name="task"
            id="task"
            value={addtask.task}
            placeholder="Add Task"
            className="p-1 border-2 border-rose-200 rounded-lg shadow"
            onChange={handleChange}
            minLength={1}
            maxLength={18}
            required
          />
          <button
            type="submit"
            className="font-bold bg-black text-white hover:bg-slate-700 duration-300 rounded-lg px-3 py-1.5"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
