import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardNavbar from "../components/DashboardNavbar";
import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/CreateTaskModel";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);


  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };


  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem("token");

        const userRes = await axios.get(
          "http://localhost:5000/api/v1/auth/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(userRes.data.user);

        const taskRes = await axios.get(
          "http://localhost:5000/api/v1/tasks/getTasks",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTasks(taskRes.data.tasks || []);
        setLoading(false);
      } catch {
        logout();
      }
    };

    init();
  }, []);


  const saveTask = async () => {
    const token = localStorage.getItem("token");

    if (editingId) {
      if (!title.trim()) {
        toast.error("Title cannot be empty!")
        return;
      }

      if (!content.trim()) {
        toast.error("Content cannot be empty!")
        return;
      }
      const res = await axios.put(
        `http://localhost:5000/api/v1/tasks/updateTask/${editingId}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );


      const updated = res.data.task || res.data.note;

      setTasks(tasks =>
        tasks.map(t => (t._id === editingId ? updated : t))
      );
    } else {
      if (!title.trim()) {
        toast.error("Title cannot be empty!")
        return;
      }

      if (!content.trim()) {
        toast.error("Content cannot be empty!")
        return;
      }
      const res = await axios.post(
        "http://localhost:5000/api/v1/tasks/create",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );


      setTasks(tasks => [res.data.task, ...tasks]);
    }

    resetModal();
  };


  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/v1/tasks/deleteTask/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTasks(tasks => tasks.filter(t => t._id !== id));
  };


  const resetModal = () => {
    setShowModal(false);
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#1e1b2e] text-white">
      <DashboardNavbar
        user={user}
        onLogout={logout}
        onSearch={(e) => setSearch(e.target.value)}
      />

      <div className="p-8">
        <div className="flex justify-between mb-6">
          <button
            className="bg-blue-600 px-4 py-2 rounded"
            onClick={() => setShowModal(true)}
          >
            + Create Task
          </button>

          <button
            className="bg-gray-600 px-4 py-2 rounded"
            onClick={() => setSearch("")}
          >
            Show All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              title={task.title}
              content={task.content}
              onEdit={() => {
                setEditingId(task._id);
                setTitle(task.title);
                setContent(task.content);
                setShowModal(true);
              }}
              onDelete={() => deleteTask(task._id)}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <CreateTaskModal
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
          isEditing={!!editingId}
          onCreate={saveTask}
          onClose={resetModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
