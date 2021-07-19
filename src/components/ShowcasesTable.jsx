import moment from 'moment'
import { confirmAlert } from 'react-confirm-alert';

export const ShowcaseTable = (props) => {

  const { showcases, handleDeleteShowcase } = props
  const showDeleteAlert = (showcase) => {
    console.log(showcase)
    confirmAlert({
      overlayClassName: "darken",
      customUI: ({ onClose }) => {
        return (
          <div className="py-6 px-12 rounded-lg shadow-xl bg-white">
            <p className="font-bold text-xl text-center">Confirm Delete</p>
            <p className="font-thin text-sm mt-2 text-center">Please confirm that you are sure <br /> to delete showcase <span className="text-base font-medium">{showcase.photoName}</span> </p>
            <div className="flex items-center justify-center mt-4">
              <button onClick={async () => {
                onClose()
                await handleDeleteShowcase({showcaseId: showcase.id})
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
    return showcases.map((showcase, index) => {
      const { accessURL, id, createdAt } = showcase
      return (
        <tr className="hover:bg-gray-50" key={id}>
          <td className="text-center border-b border-grey-light">{index + 1}</td>
          <td className="text-center border-b border-grey-light">{showcase.photoName}</td>

          <td className="text-center border-b border-grey-light"><a className="text-blue-500 underline" target="_blank" rel="noopener noreferrer" href={accessURL}>{accessURL}</a></td>
          <td className="text-center border-b border-grey-light">{moment(createdAt).format('DD/MM/YYYY [at] h:mm:ss A')}</td>
          <td className="py-4 border-b border-grey-light">
            <div className="flex justify-center">
            <button className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-red-400 text-white hover:bg-red-600"
                onClick={() => {
                  showDeleteAlert(showcase)
                }}
              >Delete
              </button>
            </div>

          </td>
        </tr>
      )
    })
  }

  if(showcases.length === 0) {
    return (
      <>
        <div className="flex justify-center mt-5">
          <img className="w-72" alt="Empty illustration" src="https://ouch-cdn2.icons8.com/eOA0XcgiFoMRCQyi2pwBBBJnZ4A9MnRQ1sYhmZxYtk8/rs:fit:932:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvODk2/LzBkMjlmYjI5LTIz/YTMtNGM0MS1hMWMw/LTliN2JmMzRiNDY4/Ny5zdmc.png"></img>
        </div>
        <p className="text-base font-medium tracking-wide text-center mt-5">Show case list is empty</p>
      </>
      
    )
  }

  return (
    <>
      <div className="bg-white shadow-md rounded my-6">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
            <th className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">No</th>
            <th className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Name</th>
              <th className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Image</th>
              <th className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Uploaded At</th>
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