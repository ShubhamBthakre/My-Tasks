import './App.css'
import {Component} from 'react'
import TagItem from './TagItem'
import TaskItem from './TaskItem'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    taskInput: '',
    optionId: tagsList[0].optionId,
    activeTagId: '',
    taskList: [],
  }

  onChangeTaskInput = event => {
    this.setState({
      taskInput: event.target.value,
    })
  }

  onChangeOption = event => {
    this.setState({optionId: event.target.value})
  }

  changeActiveTagId = tagId => {
    this.setState({activeTagId: tagId})
  }

  onSubmitForm = event => {
    event.preventDefault()

    const {taskInput, optionId} = this.state

    const tagCategory =
      tagsList[tagsList.findIndex(tag => tag.optionId === optionId)]

    const tagDetails = {
      taskInput,
      ...tagCategory,
    }

    this.setState(prevState => ({
      taskList: [...prevState.taskList, tagDetails],
      taskInput: '',
    }))
  }

  renderFormContainer = () => {
    const {taskInput, optionId} = this.state

    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        <h1 className="form-heading">Create a task!</h1>
        <div className="input-container">
          <label htmlFor="task" className="label">
            Task
          </label>
          <input
            id="task"
            placeholder="Enter the task here"
            className="input"
            value={taskInput}
            onChange={this.onChangeTaskInput}
          />
        </div>

        <div className="input-container">
          <label htmlFor="task" className="label">
            Tags
          </label>
          <select
            id="tags"
            key={optionId}
            className="input"
            onChange={this.onChangeOption}
            value={optionId}
          >
            {tagsList.map(tag => (
              <option
                id={tag.optionId}
                className="option"
                key={tag.optionId}
                value={tag.optionId}
              >
                {tag.displayText}
              </option>
            ))}
          </select>
        </div>
        <button className="add-button" type="submit">
          Add Task
        </button>
      </form>
    )
  }

  getFilteredTaskList = () => {
    const {activeTagId, taskList} = this.state

    if (activeTagId !== '') {
      return taskList.filter(task => task.optionId === activeTagId)
    }
    return taskList
  }

  renderTagsAndTaskListView = () => {
    const {activeTagId} = this.state
    const filteredTaskList = this.getFilteredTaskList()

    return (
      <div className="tag-list-container">
        <h1 className="heading">Tags</h1>
        <ul className="tag-list">
          {tagsList.map(eachTag => (
            <TagItem
              tagDetails={eachTag}
              key={eachTag.optionId}
              activeTagId={activeTagId}
              changeActiveTagId={this.changeActiveTagId}
            />
          ))}
        </ul>
        <h1 className="heading">Tasks</h1>

        {filteredTaskList.length < 1 ? (
          <div className="no-task-view-container">
            <p className="no-task-view-heading">No Tasks Added Yet</p>
          </div>
        ) : (
          <ul className="task-list">
            {filteredTaskList.map(task => (
              <TaskItem taskDetails={task} key={task.optionId} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          {this.renderFormContainer()}
          {this.renderTagsAndTaskListView()}
        </div>
      </div>
    )
  }
}

export default App
