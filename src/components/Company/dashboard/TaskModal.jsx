import React, { useState, useEffect } from "react";

const TaskModal = ({ onSave, onClose, editTask,assignees }) => {
  const [taskData, setTaskData] = useState({ id: "", title: "", description: "", assignee: "", status: "" });

  useEffect(() => {
    if (editTask) setTaskData(editTask);
  }, [editTask]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title || !taskData.assignee) {
      alert("Title and Assignee are required.");
      return;
    }
    onSave(taskData);
    setTaskData({ id: "", title: "", description: "", assignee: "", status: "" });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">{editTask ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Assignee</label>
            <select
              name="assignee"
              value={taskData.assignee}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Assignee</option>
              {assignees && assignees.map((assignee) => (
                <option key={assignee.id} value={assignee.name}>
                  {assignee.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Status</label>
            <select
              name="status"
              value={taskData.status}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Faild">Faild</option>
              <option value="Successful">Successful</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-700 text-white px-4 py-2 rounded "
            >
              {editTask ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
