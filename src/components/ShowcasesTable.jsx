import moment from 'moment'
import { useState } from 'react'
import { confirmAlert } from 'react-confirm-alert';

export const ShowcaseTable = (props) => {

  const { showcases, handleDeleteShowcase } = props
  const showDeleteAlert = (showcase) => {
    confirmAlert({
      overlayClassName: "darken",
      customUI: ({ onClose }) => {
        return (
          <div className="py-6 px-12 rounded-lg shadow-xl bg-white">
            <p className="font-bold text-xl text-center">Confirm Delete</p>
            <p className="font-thin text-sm mt-2 text-center">Please confirm that you are sure <br /> to delete snapshot <span className="text-base font-medium">{showcase.id}</span> </p>
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

  return (
    <>
      <div className="bg-white shadow-md rounded my-6">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
            <th className="py-4 text-center bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">No</th>
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