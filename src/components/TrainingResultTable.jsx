import moment from 'moment'

export const TrainingResultTalbe = (props) => {
  const {results} = props
  const renderTableItem = () => {
    return results.map(trainingHistory => {
      const {id, photoAccessURL, snapshotAccessURL, step} = trainingHistory
      return (
        <tr className="hover:bg-gray-50" key={id}>
          <td className="text-center border-b border-grey-light"><span className="font-medium">{step}</span></td>
          <td className="py-4 border-b border-grey-light">
            <div className="flex justify-center">
                <a href={snapshotAccessURL} className="italic underline text-blue-500">Download Snapshot</a>
            </div>
          </td>
          <td className="text-center border-b border-grey-light flex justify-center py-2">
            <a href={photoAccessURL}><img alt="training result" className="h-20 bg-red-100 rounded" src={photoAccessURL}></img></a>
          </td>
          <td className="text-center border-b border-grey-light">{moment(new Date()).format('DD/MM/YYYY')}</td>
        </tr>
      )
    })
  }

  if(results.length == 0) {
    return (
      <>
        <div className="flex justify-center mt-5">
          <img className="w-72" src="https://ouch-cdn2.icons8.com/HfyHdgt1q5Fx1iA_z9w50f3PkS_x6rN_ttCjhrS-tXM/rs:fit:912:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNTY4/L2E3YTJlNWRkLTA3/MmUtNGEyMS1hN2M4/LTRlZmJlNGY2ZDMz/ZS5zdmc.png"></img>
        </div>
        <p className="text-base font-medium tracking-wide text-center mt-5">Training result is empty</p>
      </>
      
    )
  }

  return (
    <div className="bg-white shadow-md rounded my-6 w-4/5">
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
