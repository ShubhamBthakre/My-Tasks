import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {displayText, taskInput} = taskDetails

  return (
    <li className="task-item">
      <p className="task-input">{taskInput}</p>
      <p className="task-category">{displayText}</p>
    </li>
  )
}

export default TaskItem
