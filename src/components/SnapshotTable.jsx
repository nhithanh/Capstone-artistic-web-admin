import moment from 'moment'

export const SnapshotTable = (props) => {

    const {snapshots} = props

    const renderTableItem = () => {
      return snapshots.map(style => {
        const {name, id, createdAt} = style
        return (
          <tr className="hover:bg-gray-50" key={id}>
            <td className="text-center border-b border-grey-light">{name}</td>
            <td className="text-center border-b border-grey-light">{moment(createdAt).format('DD/MM/YYYY [at] h:mm:ss a')}</td>
            <td className="text-center border-b border-grey-light">12/07/2021</td>
            <td className="py-4 border-b border-grey-light">
              <div className="flex justify-center">
                <button className="text-grey-lighter font-bold py-1 px-3 mr-1 text-white rounded text-xs bg-blue-500 hover:bg-blue-700">View</button>
                <button className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-400 text-white hover:bg-red-600">Delete</button>
              </div>
              
            </td>
            </tr>
        )
      })
    }

    return (
        <>
            <div className="bg-white shadow-md rounded my-6">
              <table className="text-left w-full border-collapse">
                <thead>
                  <tr>
                    <th className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Name</th>
                    <th className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Updated At</th>
                    <th className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Created At</th>
                    <th className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {renderTableItem()}
                </tbody>
              </table>
            </div>
        </>
    )
}