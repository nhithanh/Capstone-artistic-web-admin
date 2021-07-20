import React, {useState, useEffect} from 'react'
import {createNewStyle} from '../apis/styles'
import {NavMenu} from '../components/NavMenu'
import {useHistory} from "react-router-dom";
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json'
import backIcon from '../assets/back.png'
import defaultPicture from '../assets/default.jpg'

export const CreateNewStylePage = () => {
  const [styleName, setStyleName] = useState('')
  const [styleNameError, setStyleNameError] = useState('')
  const [iconFile, setIconFile] = useState(null)
  const[iconFileError, setIconFileError] = useState('')
  const history = useHistory();
  const [loading,
    setLoading] = useState(false)
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    isStopped: !loading
  };

  useEffect(() => {
    document.title = "Create New Style"
  }, [])

  const resetError = () => {
    setStyleNameError('')
    setIconFileError('')
  }

  const handleCreate = () => {
    let isValid = true
    if(styleName.length === 0) {
      isValid = false
      setStyleNameError("Style Name cannot be blank!")
    }
    if(iconFile === null) {
      isValid = false
      setIconFileError("You must select style image to create new style")
    }

    if(iconFile !== null) {
      let fileType = iconFile.type
      if(fileType.split("/")[0] !== "image") {
        isValid = false
        setIconFileError("Style Image must be valid image file")
      }
    }

    if(isValid === true) {
      resetError()
      setLoading(true)
      createNewStyle({styleName, isActive: false, iconFile}).then(rs => {
        setLoading(false)
        history.push("/styles")
      })
    }
  }

  return (
    <div className="flex h-screen">
      <div
        className={loading
        ? "w-full flex items-center h-full absolute bg-white z-50"
        : "w-full flex items-center h-full absolute bg-white hidden"}
        style={{
        backgroundColor: "rgba(0, 0, 0, 0.85)"
      }}>
        <Lottie options={defaultOptions} height={100} width={100}/>
      </div>
      <div className="w-1/5">
        <NavMenu activePage="Create New Style"/>
      </div>
      <div className="w-3/5 pt-5">
        <div className="flex items-center mb-6">
          <img
            alt="Go back icon"
            src={backIcon}
            onClick={() => history.push('/styles')}
            className="h-6 w-6 mr-5 cursor-pointer"/>
          <div className="text-2xl font-thin">Create New Application's Style</div>

        </div>
        <div className="font-medium text-xl mb-3">Basic Information</div>
        <div>
          <div className="flex">
            <div>
              <img
                alt="Style Icon"
                className="rounded-lg shadow-2xl h-44"
                src={iconFile
                ? URL.createObjectURL(iconFile) : defaultPicture}/>

              <div class="mt-3 space-y-2 w-full text-xs flex items-end">
                <label className="font-semibold text-gray-600 py-2">Style Icon:</label>
                <div
                  className="relative text-grey-lighter font-bold py-1 px-3 mt-4 text-white rounded text-sm bg-blue-500 hover:bg-blue-700 ml-3">
                  <input
                    onChange={(event) => {
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
                <p className="text-red-400 text-xs">{styleNameError}</p>
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
          <p className="text-red-500 text-xs mt-1">{iconFileError}</p>
          <button
            onClick={() => handleCreate()}
            className="text-grey-lighter font-bold py-2 px-3 mt-4 text-white rounded text-sm bg-green-500 hover:bg-green-700 shadow-lg w-1/4">Create</button>
        </div>
      </div>
    </div>
  );
}