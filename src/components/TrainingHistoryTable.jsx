import {useHistory} from "react-router-dom";
import moment from 'moment'
import { confirmAlert } from 'react-confirm-alert';


const renderStatus = (status) => {
  switch(status) {
    case "WAITING":
      return <button className="cursor-default text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-400 text-white shadow">Waiting</button>
    case "STOPPED":
      return <button className="cursor-default text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-400 text-white shadow">Stopped</button>
    case "ON PROGRESS":
      return <button className="cursor-default text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-yellow-500 text-white shadow">On progress</button>
    default:
      return null
  }
}

export const TrainingHistoryTable = (props) => {
  const history = useHistory();
  const {trainingRequests} = props
  const renderTableItem = () => {
    return trainingRequests.map(trainingRequest => {
      const {id, name, createdAt, accessURL, status, checkpoint} = trainingRequest
      return (
        <tr className="hover:bg-gray-50" key={id}>
          <td className="text-center border-b border-grey-light">{name}</td>
          <td className="py-4 border-b border-grey-light">
            <div className="flex justify-center">
              <img
                alt="Style Icon"
                className="w-14 h-14 rounded-xl shadow"
                src={accessURL}/>
            </div>
          </td>
          <td className="text-center border-b border-grey-light">
            {renderStatus(status)}
          </td>
          <td className="text-center border-b border-grey-light">{checkpoint}</td>
          <td className="text-center border-b border-grey-light">{moment(createdAt).format('DD/MM/YYYY')}</td>
          <td className="py-4 border-b border-grey-light">
            <button
              onClick={() => history.push(`/training-requests/${id}`)}
              className="text-grey-lighter font-bold py-1 px-3 mr-1 text-white rounded text-xs bg-blue-500 hover:bg-blue-700">View</button>
            {
              status === 'ON PROGRESS' ? <button
                onClick={() => history.push(`/training-requests/${id}`)}
              className="text-grey-lighter font-bold py-1 px-3 mr-1 text-white rounded text-xs bg-red-400 hover:bg-red-700">Stop</button> : 
              (
                <button
                  onClick={() => showAlert(status, name, () => console.log("Click"))}
                  className="text-grey-lighter font-bold py-1 px-3 mr-1 text-white rounded text-xs bg-red-400 hover:bg-red-700">
                  Delete
                </button>
              )
            }
          </td>
        </tr>
      )
    })
  }

  const showAlert = (status, name, handleOk) => {
    const title = status === "ON PROGRESS" ? "Stop" : "Delete"
    confirmAlert({
      overlayClassName: "darken",
      customUI: ({ onClose }) => {
        return (
          <div className="py-6 px-12 rounded-lg shadow-xl bg-white">
            <p className="font-bold text-xl text-center">Confirm {title} Training Request</p>
            <p className="font-thin text-sm mt-2 text-center">Please confirm that you are sure to {title.toLowerCase()} {name}</p>
            <div className="flex items-center justify-center mt-4">
              <button onClick={async () => {
                onClose()
                
              }} className="bg-yellow-300 px-4 py-2 rounded-lg shadow-lg text-black text-base mx-2 font-medium">
                {title}
              </button>
              <button onClick={() => onClose()} className="bg-gray-800 px-4 py-2 rounded-lg shadow-lg text-white text-base mx-2 font-medium">Cancel</button>
            </div>
          </div>
        )
      }
    })
  }

  return (
    <div className="bg-white shadow-md rounded my-6">
      <table className="text-left w-full border-collapse">
        <thead>
          <tr>
            <th
              className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Name</th>
            <th
              className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Reference Style</th>
            <th
              className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Status</th>
              <th
              className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Checkpoint</th>
            <th
              className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Created at</th>
            <th
              className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"></th>
          </tr>
        </thead>
        <tbody>
          {renderTableItem()}
        </tbody>
      </table>
    </div>
  )
}
