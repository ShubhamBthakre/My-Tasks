import './index.css'

const TagItem = props => {
  const {tagDetails, activeTagId, changeActiveTagId} = props
  const {optionId} = tagDetails

  const buttonClassName =
    activeTagId === optionId ? 'active-tag-button tag-button' : 'tag-button'

  const onClickTagButton = () => {
    changeActiveTagId(optionId)
  }

  return (
    <li className="tag-item" key={optionId}>
      <button
        type="button"
        className={buttonClassName}
        onClick={onClickTagButton}
      >
        {tagDetails.displayText}
      </button>
    </li>
  )
}

export default TagItem
