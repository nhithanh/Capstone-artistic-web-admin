import {useHistory} from "react-router-dom";
import moment from 'moment'

const renderStatus = (status) => {
  if (status === "WAITING") {
    return <button
    className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue-400 text-white shadow">Waiting</button>
  }
}

export const TrainingHistoryTable = (props) => {
  const history = useHistory();
  const {trainingRequests} = props
  const renderTableItem = () => {
    return trainingRequests.map(trainingRequest => {
      const {id, name, createdAt, lr, accessURL, status, checkpoint} = trainingRequest
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
          </td>
        </tr>
      )
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
