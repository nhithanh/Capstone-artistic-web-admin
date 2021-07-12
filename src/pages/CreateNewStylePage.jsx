import React, {useState, useEffect} from 'react'
import {SnapshotTable} from '../components/SnapshotTable'
import {fetchAllStyles} from '../apis/styles'
import {NavMenu} from '../components/NavMenu'
import {useHistory} from "react-router-dom";

export const CreateNewStylePage = () => {
  const [styles,
    setStyles] = useState([])
  const history = useHistory();

  useEffect(() => {
    fetchAllStyles().then(styles => {
      setStyles(styles)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className="flex h-screen">
      <div className="w-1/5">
        <NavMenu activePage="Create New Style"/>
      </div>
      <div className="w-3/5 pt-5">
        <div className="flex items-center mb-6">
          <img
            src="https://image.flaticon.com/icons/png/512/545/545680.png"
            onClick={() => history.push('/')}
            className="h-6 w-6 mr-5 cursor-pointer"/>
          <div className="text-2xl font-thin">Create New Application's Style</div>

        </div>
        <div className="font-medium text-xl mb-3">Basic Information</div>
        <div>
          <div className="flex">
            <div>
              <img
                className="rounded-lg shadow-2xl h-44"
                src="https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Francis_Picabia%2C_1913%2C_Udnie_%28Young_American_Girl%2C_The_Dance%29%2C_oil_on_canvas%2C_290_x_300_cm%2C_Mus%C3%A9e_National_d%E2%80%99Art_Moderne%2C_Centre_Georges_Pompidou%2C_Paris..jpg/599px-Francis_Picabia%2C_1913%2C_Udnie_%28Young_American_Girl%2C_The_Dance%29%2C_oil_on_canvas%2C_290_x_300_cm%2C_Mus%C3%A9e_National_d%E2%80%99Art_Moderne%2C_Centre_Georges_Pompidou%2C_Paris..jpg"></img>

              <div class="mt-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">Style Icon:</label>
                <button
                  className="text-grey-lighter font-bold py-1 px-3 mt-4 text-white rounded text-sm bg-blue-500 hover:bg-blue-700 ml-3">Browse</button>
              </div>
            </div>
            <div className="ml-5 w-1/3">
              <div class="mb-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">Style Name</label>
                <input
                  placeholder="Enter Style's Name"
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 w-52 px-4"
                  required="required"
                  type="text"
                  name="integration[shop_name]"
                  id="integration_shop_name"/>
                <p className="text-red text-xs hidden">Please fill out this field.</p>
              </div>
              <div className="mb-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">Status</label>
                <select
                  className="w-full border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                  <option>Active</option>
                  <option>Deactive</option>
                </select>
                <p className="text-red text-xs hidden">Please fill out this field.</p>
              </div>
            </div>
          </div>
          <button
            className="text-grey-lighter font-bold py-2 px-3 mt-4 text-white rounded text-sm bg-green-500 hover:bg-green-700 shadow-lg w-1/4">Save</button>
        </div>
      </div>
    </div>
  );
}