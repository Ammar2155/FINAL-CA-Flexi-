"use client"

import { useState } from "react"
import "./TaskCard.css"

const TaskCard = ({ task, onUpdateTask, onDeleteTask }) => {
  const [showEdit, setShowEdit] = useState(false)
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
  })

  const handleStatusChange = (newStatus) => {
    onUpdateTask(task._id, { status: newStatus })
  }

  const handleSaveEdit = () => {
    onUpdateTask(task._id, editData)
    setShowEdit(false)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#e74c3c"
      case "medium":
        return "#f39c12"
      case "low":
        return "#27ae60"
      default:
        return "#95a5a6"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#27ae60"
      case "in-progress":
        return "#3498db"
      case "todo":
        return "#95a5a6"
      default:
        return "#95a5a6"
    }
  }

  const formatDate = (date) => {
    if (!date) return "No due date"
    return new Date(date).toLocaleDateString()
  }

  return (
    <div className="task-card">
      {showEdit ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="edit-title"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="edit-description"
            rows="2"
          />
          <div className="edit-actions">
            <button onClick={handleSaveEdit} className="save-btn">
              Save
            </button>
            <button onClick={() => setShowEdit(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-header">
            <h3>{task.title}</h3>
            <button onClick={() => onDeleteTask(task._id)} className="delete-btn">
              Delete
            </button>
          </div>

          {task.description && <p className="task-description">{task.description}</p>}

          <div className="task-meta">
            <span className="due-date">📅 {formatDate(task.dueDate)}</span>
            <span className="priority" style={{ background: getPriorityColor(task.priority) }}>
              {task.priority}
            </span>
          </div>

          <div className="task-status">
            <label>Status:</label>
            <select value={task.status} onChange={(e) => handleStatusChange(e.target.value)}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button onClick={() => setShowEdit(true)} className="edit-btn">
            Edit
          </button>
        </>
      )}
    </div>
  )
}

export default TaskCard
