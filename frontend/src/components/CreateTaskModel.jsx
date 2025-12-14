import React from "react";

const CreateTaskModal = ({ onClose, onCreate, title, content, setTitle, setContent, isEditing }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1e1b2e] p-6 rounded-xl w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold mb-4">Create Task</h2>

        <input
          type="text"
          placeholder="Task title"
          className="w-full mb-3 p-2 rounded bg-gray-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task content"
          rows="4"
          className="w-full mb-4 p-2 rounded bg-gray-700"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-gray-600 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onCreate}
            className="px-4 py-1 bg-blue-600 rounded"
          >
            {isEditing ? "Update" : "Create"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
