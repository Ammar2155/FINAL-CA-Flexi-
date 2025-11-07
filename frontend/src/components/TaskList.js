import TaskCard from "./TaskCard"
import "./TaskList.css"

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks found. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} />
      ))}
    </div>
  )
}

export default TaskList
