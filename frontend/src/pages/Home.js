"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"
import "./Home.css"

const Home = ({ token, user, onLogout }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTasks(response.data)
    } catch (err) {
      console.error("Failed to fetch tasks:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [token])

  const handleAddTask = async (taskData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/tasks", taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTasks([response.data, ...tasks])
    } catch (err) {
      console.error("Failed to add task:", err)
    }
  }

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)))
    } catch (err) {
      console.error("Failed to update task:", err)
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTasks(tasks.filter((task) => task._id !== taskId))
    } catch (err) {
      console.error("Failed to delete task:", err)
    }
  }

  const filteredTasks = filter === "all" ? tasks : tasks.filter((task) => task.status === filter)

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>Task Manager</h1>
          <div className="user-info">
            <span>Welcome, {user?.username}</span>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="home-main">
        <div className="task-container">
          <TaskForm onAddTask={handleAddTask} />

          <div className="filter-section">
            <h3>Filter Tasks</h3>
            <div className="filter-buttons">
              <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
                All
              </button>
              <button className={filter === "todo" ? "active" : ""} onClick={() => setFilter("todo")}>
                To Do
              </button>
              <button className={filter === "in-progress" ? "active" : ""} onClick={() => setFilter("in-progress")}>
                In Progress
              </button>
              <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>
                Completed
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : (
            <TaskList tasks={filteredTasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
