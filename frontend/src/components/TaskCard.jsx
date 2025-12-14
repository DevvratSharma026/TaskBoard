import React from "react";

const TaskCard = ({ title, content, onEdit, onDelete }) => {
  return (
    <div className="bg-[#2a2545] shadow-[0_0_15px_rgba(255,255,255,0.4)] text-white rounded-xl p-5  flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{content}</p>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-yellow-500 text-black rounded-md text-sm"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 rounded-md text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
