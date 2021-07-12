import React, {useState} from 'react'
import {createNewStyle} from '../apis/styles'
import {NavMenu} from '../components/NavMenu'
import {useHistory} from "react-router-dom";

export const CreateNewStylePage = () => {
  const [styleName, setStyleName] = useState('')
  const [iconFile, setIconFile] = useState(null)
  const history = useHistory();

  const handleCreate = () => {
    createNewStyle({styleName, isActive: false, iconFile})
  }

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
                src={iconFile ? URL.createObjectURL(iconFile) : "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg"}></img>

              <div class="mt-3 space-y-2 w-full text-xs flex items-end">
                <label className="font-semibold text-gray-600 py-2">Style Icon:</label>
                <div
                  className="relative text-grey-lighter font-bold py-1 px-3 mt-4 text-white rounded text-sm bg-blue-500 hover:bg-blue-700 ml-3">
                    <input
                      onChange={(event) => {
                        console.log(event.target.files[0])
                        setIconFile(event.target.files[0])
                      }}
                      type="file"
                      accept="image/png, image/jpeg"
                      class="opacity-0 w-full h-full absolute"/>
                    Browse
                  </div>
              </div>
            </div>
            <div className="ml-5 w-1/3">
              <div class="mb-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">Style Name</label>
                <input
                  value={styleName}
                  onChange={(e) => setStyleName(e.target.value)}
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
                  value={false}
                  disabled={true}
                  className="w-full border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                  <option value={true}>Active</option>
                  <option value={false}>Deactive</option>
                </select>
                <p className="text-red text-xs hidden">Please fill out this field.</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleCreate()}
            className="text-grey-lighter font-bold py-2 px-3 mt-4 text-white rounded text-sm bg-green-500 hover:bg-green-700 shadow-lg w-1/4">Create</button>
        </div>
      </div>
    </div>
  );
}