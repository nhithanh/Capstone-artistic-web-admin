import {useHistory} from "react-router-dom";

export const NavMenu = (props) => {

  const {activePage} = props

  const renderItem = (title, handleClick) => {
    if (title == activePage) {
      return (
        <li className="my-px bg-gray-50 rounded">
          <span
            className="flex font-medium text-sm text-gray-500 px-4 my-4 uppercase cursor-pointer">{title}</span>
        </li>
      )
    } else {
      return (
        <li className="my-px">
          <span
            onClick={() => handleClick()}
            className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase cursor-pointer">{title}</span>
        </li>
      )
    }
  }
  const history = useHistory();

  return (
    <div className="flex w-full h-full max-w-xs p-4 bg-gray-800">
      <ul className="flex flex-col w-full">
        {renderItem('Style List', () => history.push('/'))}
        {renderItem('Create New Style', () => history.push('create-new-style'))}
        <li className="my-px">
          <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">Log Out</span>
        </li>
      </ul>
    </div>
  )
}