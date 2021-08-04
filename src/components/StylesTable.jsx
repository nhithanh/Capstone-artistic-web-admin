import {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import moment from 'moment'
import { confirmAlert } from 'react-confirm-alert';
import { range } from 'lodash';


export const StylesTable = (props) => {
  const history = useHistory();
  const {styles, handleDeleteStyle} = props
  const handleItemClick = (styleId) => {
    history.push(`/styles/${styleId}`)
  }

  const eachPage = 7

  const [totalPage, setTotalPage] = useState(0)
  const [curPage, setCurPage] = useState(0)

  useEffect(() => {
    console.log(styles.length)
    setTotalPage(Math.ceil(styles.length / eachPage))
  }, [styles])

  const showDeleteAlert = (style) => {
    confirmAlert({
      overlayClassName: "darken",
      customUI: ({ onClose }) => {
        return (
          <div className="py-6 px-12 rounded-lg shadow-xl bg-white">
            <p className="font-bold text-xl text-center">Confirm Delete</p>
            <p className="font-thin text-sm mt-2 text-center">Please confirm that you are sure <br/> to delete style <span className="text-base font-medium">{style.styleName}</span> </p>
            <div className="flex items-center justify-center mt-4">
              <button onClick={async () => {
                onClose()
                handleDeleteStyle({styleId: style.id})
              }} className="bg-yellow-300 px-4 py-2 rounded-lg shadow-lg text-black text-base mx-2 font-medium">
                Delete
              </button>
              <button onClick={() => onClose()} className="bg-gray-800 px-4 py-2 rounded-lg shadow-lg text-white text-base mx-2 font-medium">Cancel</button>
            </div>
          </div>
        )
      }
    })
  }
  const renderTableItem = () => {
    return styles.slice((curPage) * eachPage, (curPage) * eachPage + eachPage).map(style => {
      const {
        styleName,
        iconURL,
        id,
        createdAt,
        updatedAt,
        isActive
      } = style
      return (
        <tr className="hover:bg-gray-50" key={id}>
          <td className="py-4 border-b border-grey-light">
            <div className="flex justify-center">
              <img alt="Style Icon" className="w-14 h-14 rounded-xl shadow" src={iconURL}/>
            </div>
          </td>
          <td className="text-center border-b border-grey-light">{styleName}</td>
          <td className="text-center border-b border-grey-light">
            {isActive
              ? (
                <button
                  className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green-400 text-white shadow">Active</button>
              )
              : (
                <button
                  className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-400 text-white shadow">Deactive</button>
              )
}
          </td>
          <td className="text-center border-b border-grey-light">{moment(createdAt).format('DD/MM/YYYY [at] h:mm:ss A')}</td>
          <td className="text-center border-b border-grey-light">{moment(updatedAt).format('DD/MM/YYYY [at] h:mm:ss A')}</td>
          <td className="py-4 border-b border-grey-light">
            <div className="flex justify-center">
              <button
                onClick={() => handleItemClick(id)}
                className="text-grey-lighter font-bold py-1 px-3 mr-1 text-white rounded text-xs bg-blue-500 hover:bg-blue-700">View</button>
              <button
                onClick={() => {
                  showDeleteAlert(style)
                }} 
                className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-400 text-white hover:bg-red-600">Delete</button>
            </div>

          </td>
        </tr>
      )
    })
  }

  const renderPage = () => {
    return range(1, totalPage + 1).map(i => {
      if(i === curPage + 1) {
        return <button className="font-bold text-white bg-red-400 shadow px-3 py-2 rounded mx-2 cursor-default">{i}</button>
      } else {
        return <button onClick={() => {
          setCurPage(i - 1)
        }} className="font-bold text-white shadow px-3 py-2 rounded mx-2 text-red-400 border border-red-500 hover:bg-red-600 hover:text-white">{i}</button>
      }
    })
  }

  return (
    <div>

<div className="bg-white shadow-md rounded my-6">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
              <th
                className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Style</th>
              <th
                className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Name</th>
              <th
                className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Status</th>
              <th
                className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Updated At</th>
              <th
                className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Created At</th>
              <th
                className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderTableItem()}
          </tbody>
        </table>
        
      </div>
      <div className="flex items-center justify-center">
        {renderPage()}
      </div>

    </div>
      
    )
  }
