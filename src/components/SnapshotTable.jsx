import moment from 'moment'
import { confirmAlert } from 'react-confirm-alert';
import empty2 from '../assets/empty2.png'

export const SnapshotTable = (props) => {

  const { snapshots, handleDeleteSnapshot, activeSnapshotId } = props
  const showDeleteAlert = (snapshot) => {
    confirmAlert({
      overlayClassName: "darken",
      customUI: ({ onClose }) => {
        return (
          <div className="py-6 px-12 rounded-lg shadow-xl bg-white">
            <p className="font-bold text-xl text-center">Confirm Delete</p>
            <p className="font-thin text-sm mt-2 text-center">Please confirm that you are sure <br /> to delete snapshot <span className="text-base font-medium">{snapshot.name}</span> </p>
            <div className="flex items-center justify-center mt-4">
              <button onClick={async () => {
                onClose()
                await handleDeleteSnapshot({ snapshotId: snapshot.id })
              }} 
              className="bg-yellow-300 px-4 py-2 rounded-lg shadow-lg text-black text-base mx-2 font-medium">
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
    return snapshots.map(snapshot => {
      const { name, id, createdAt, description } = snapshot
      return (
        <tr className="hover:bg-gray-50" key={id}>
          <td className="text-center border-b border-grey-light">{name}</td>
          <td className="text-center border-b border-grey-light">{moment(createdAt).format('DD/MM/YYYY [at] h:mm:ss A')}</td>
          <td className="text-center border-b border-grey-light">{description}</td>
          <td className="py-4 border-b border-grey-light">
            <div className="flex justify-center">
              {id === activeSnapshotId ? 
              (<button className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green-400 text-white hover:bg-green-600">
                Active
            </button>) 
              :
               (<button className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-400 text-white hover:bg-red-600"
                onClick={() => {
                  showDeleteAlert(snapshot)
                }}
              >Delete
              </button>)}
            </div>

          </td>
        </tr>
      )
    })
  }

  if(snapshots.length === 0) {
    return (
      <>
        <div className="flex justify-center mt-5">
          <img alt="Empty illustration" className="w-72" src={empty2}></img>
        </div>
        <p className="text-base font-medium tracking-wide text-center mt-5">Snapshot list is empty</p>
      </>
      
    )
  }

  return (
    <>
      <div className="bg-white shadow-md rounded my-6">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
              <th className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Name</th>
              <th className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Created At</th>
              <th className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Brief Information</th>
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