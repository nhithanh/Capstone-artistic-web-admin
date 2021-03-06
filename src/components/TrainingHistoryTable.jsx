import {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import moment from 'moment'
import { confirmAlert } from 'react-confirm-alert';
import { handleDeleteTrainingRequest, stopTraining } from "../apis/training-request";
import { useDispatch, useSelector } from "react-redux";
import { deleteTrainingRequest, selectTrainingRequests, updateTrainingRequests } from "../redux/slicers/training-request";
import { range } from 'lodash';


const renderStatus = (status) => {
  switch(status) {
    case "WAITING":
      return <button className="cursor-default text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-400 text-white shadow">Waiting</button>
    case "STOPPED":
      return <button className="cursor-default text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-400 text-white shadow">Stopped</button>
    case "IN PROGRESS":
      return <button className="cursor-default text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-yellow-500 text-white shadow">In progress</button>
    case "COMPLETED":
      return <button className="cursor-default text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green-500 text-white shadow">Completed</button>
    default:
      return null
  }
}

export const TrainingHistoryTable = () => {
  const history = useHistory();
  const trainingRequests = useSelector(selectTrainingRequests)

  const [totalPage, setTotalPage] = useState(0)
  const [curPage, setCurPage] = useState(0)
  const [trainingRequestsArray, setTrainingRequestsArray] = useState([])

  useEffect(() => {
    setTrainingRequestsArray(Object.keys(trainingRequests).map(key => trainingRequests[key])) 
  }, [trainingRequests])

  useEffect(() => {
    setTotalPage(Math.ceil(trainingRequestsArray.length / 7))
  }, [trainingRequestsArray])

  const dispatch = useDispatch()
  const renderTableItem = () => {
    return trainingRequestsArray.slice((curPage) * 7, (curPage) * 7 + 7).map(trainingRequest => {
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
          <td className="text-center border-b border-grey-light">{moment(createdAt).format('DD/MM/YYYY, h:mm:ss')}</td>
          <td className="py-4 border-b border-grey-light">
            <button
              onClick={() => history.push(`/training-requests/${id}`)}
              className="text-grey-lighter font-bold py-1 px-3 mr-1 text-white rounded text-xs bg-blue-500 hover:bg-blue-700">View</button>
            {
              status === 'IN PROGRESS' ? 
              (<button
                onClick={() => showAlert(status, name, () => {
                  stopTraining(id).then(() => {
                    let newTrainingRequests = {
                      ...trainingRequest,
                      status: "STOPPED"
                    }
                    dispatch(updateTrainingRequests(newTrainingRequests))
                  })
                })}
                className="text-grey-lighter font-bold py-1 px-3 mr-1 text-white rounded text-xs bg-red-400 hover:bg-red-700">Stop</button>) : 
              (
                <button
                  onClick={() => showAlert(status, name, () => {
                    handleDeleteTrainingRequest(id).then(() => {
                      dispatch(deleteTrainingRequest({id}))
                    })
                  })}
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

  const showAlert = (status, name, handleOk) => {
    const title = status === "IN PROGRESS" ? "Stop" : "Delete"
    confirmAlert({
      overlayClassName: "darken",
      customUI: ({ onClose }) => {
        return (
          <div className="py-6 px-12 rounded-lg shadow-xl bg-white">
            <p className="font-bold text-xl text-center">Confirm {title} Training Request</p>
            <p className="font-thin text-sm mt-2 text-center">Please confirm that you are sure to {title.toLowerCase()} {name}</p>
            <div className="flex items-center justify-center mt-4">
              <button onClick={async () => {
                handleOk()
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
    <div>
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
    <div className="flex items-center justify-center">
      {renderPage()}
    </div>
    </div>
    
  )
}
