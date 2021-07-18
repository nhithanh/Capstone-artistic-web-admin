import {useHistory} from "react-router-dom";
import moment from 'moment'

export const TrainingHistoryTable = (props) => {
  const history = useHistory();
  const {trainingHistories} = props
  const handleItemClick = (styleId) => {
    history.push(`/styles/${styleId}`)
  }
  const renderTableItem = () => {
    return trainingHistories.map(trainingHistory => {
      const {id} = trainingHistory
      return (
        <tr className="hover:bg-gray-50" key={id}>
          <td className="text-center border-b border-grey-light">Udnie v1</td>
          <td className="py-4 border-b border-grey-light">
            <div className="flex justify-center">
              <img
                alt="Style Icon"
                className="w-14 h-14 rounded-xl shadow"
                src="https://upload.wikimedia.org/wikipedia/en/8/82/Francis_Picabia%2C_1913%2C_Udnie_%28Young_American_Girl%2C_The_Dance%29%2C_oil_on_canvas%2C_290_x_300_cm%2C_Mus%C3%A9e_National_d%E2%80%99Art_Moderne%2C_Centre_Georges_Pompidou%2C_Paris..jpg"/>
            </div>
          </td>
          <td className="text-center border-b border-grey-light">1e-3</td>
          <td className="text-center border-b border-grey-light">1e5</td>
          <td className="text-center border-b border-grey-light">1e10</td>
          <td className="text-center border-b border-grey-light">2000</td>
          <td className="text-center border-b border-grey-light">0.7</td>
          <td className="text-center border-b border-grey-light">0.5</td>
          <td className="text-center border-b border-grey-light">0.3</td>
          <td className="text-center border-b border-grey-light">0.2</td>
          <td className="text-center border-b border-grey-light">
            {true
              ? (
                <button
                  className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green-400 text-white shadow">Completed</button>
              )
              : (
                <button
                  className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-400 text-white shadow">Canceled</button>
              )
}
          </td>
          <td className="text-center border-b border-grey-light">5000</td>
          <td className="text-center border-b border-grey-light">{moment(new Date()).format('DD/MM/YYYY')}</td>
          <td className="py-4 border-b border-grey-light">
            <button
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
              className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">lr</th>
            <th
              className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Content</th>
            <th
              className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Style</th>
            <th
              className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Step</th>
              <th
              className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Relu1_2</th>
              <th
              className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Relu2_2</th>
              <th
              className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Relu3_3</th>
              <th
              className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Relu4_3</th>
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
