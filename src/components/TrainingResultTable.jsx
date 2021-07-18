import {useHistory} from "react-router-dom";
import moment from 'moment'
import logo from './rs_1.jpg'

export const TrainingResultTalbe = (props) => {
  const history = useHistory();
  const {results} = props
  const renderTableItem = () => {
    return results.map(trainingHistory => {
      const {id} = results
      return (
        <tr className="hover:bg-gray-50" key={id}>
          <td className="text-center border-b border-grey-light"><span className="font-medium">2000</span></td>
          <td className="py-4 border-b border-grey-light">
            <div className="flex justify-center">
                <a href="#" className="italic underline text-blue-500">http://snapshot-file.com</a>
            </div>
          </td>
          <td className="text-center border-b border-grey-light flex justify-center py-2">
            <img className="h-20 rounded" src={logo}></img>
          </td>
          <td className="text-center border-b border-grey-light">{moment(new Date()).format('DD/MM/YYYY')}</td>
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
              className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Step</th>
            <th
              className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Snapshot File</th>
            <th
              className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Result</th>
            
            <th
              className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Saved At</th>
          </tr>
        </thead>
        <tbody>
          {renderTableItem()}
        </tbody>
      </table>
    </div>
  )
}
