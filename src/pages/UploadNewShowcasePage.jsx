import React, { useState, useEffect } from 'react'
import { addShowcase } from '../apis/showcases'
import { NavMenu } from '../components/NavMenu'
import { useHistory } from "react-router-dom";
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json'
import { useParams } from 'react-router-dom'
import backIcon from '../assets/back.png'
import defaultPicture from '../assets/default.jpg'

export const UploadNewShowCasePage = () => {
  const [showcaseName, setShowcaseName] = useState('')
  const [iconFile, setIconFile] = useState(null)
  const [iconFileError, setIconFileError] = useState('')
  const [showcaseNameError, setShowcaseNameError] = useState('')
  const history = useHistory();
  let { id } = useParams()
  const [loading, setLoading] = useState(false)
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    isStopped: !loading
  };

  useEffect(() => {
    document.title = "Upload Showcase Image"
  }, [])

  const resetErrorState = () => {
    setIconFileError("")
    setShowcaseNameError("")
  }

  const handleAddNewShowcase = () => {
    let isValid = true

    if (showcaseName.length === 0) {
      setShowcaseNameError("Showcase Name cannot be blank!")
    }

    if (iconFile === null) {
      isValid = false
      setIconFileError("You must select style image to create new style")
    }

    if (iconFile !== null) {
      let fileType = iconFile.type

      if (fileType.split("/")[0] !== "image") {
        isValid = false
        setIconFileError("Style Image must be valid image file")
      }
    }

    if (isValid === true) {
      resetErrorState()
      setLoading(true)
      addShowcase({ showcaseName, file: iconFile, styleId: id }).then(rs => {
        setLoading(false)
        history.push(`/styles/${id}`)
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
        <Lottie options={defaultOptions} height={100} width={100} />
      </div>
      <div className="w-1/4 xl:w-1/5 2xl:w-1/6 fixed h-screen">
        <NavMenu activePage="Create New Style" />
      </div>
      <div className="w-1/4 xl:w-1/5 2xl:w-1/6"></div>
      <div className="w-3/4 xl:w-4/5 px-9 2xl:w-5/6 pt-5 overflow-auto pb-10">
        <div className="flex items-center mb-6">
          <img
            alt="Go back icon"
            src={backIcon}
            onClick={() => history.push(`/styles/${id}`)}
            className="h-6 w-6 mr-5 cursor-pointer" />
          <div className="text-2xl font-thin">Add New Showcase</div>

        </div>
        <div className="font-medium text-xl mb-3">Basic Information</div>
        <div>
          <div className="flex">
            <div>
              <img
                alt="Style Icon"
                className="rounded-lg shadow-2xl h-44"
                src={iconFile
                  ? URL.createObjectURL(iconFile)
                  : defaultPicture} />

              <div className="mt-3 space-y-2 w-full text-xs flex items-end">
                <label className="font-semibold text-gray-600 py-2">Showcase image:</label>
                <div
                  className="relative text-grey-lighter font-bold py-1 px-3 mt-4 text-white rounded text-sm bg-blue-500 hover:bg-blue-700 ml-3">
                  <input
                    onChange={(event) => {
                      setIconFile(event.target.files[0])
                    }}
                    type="file"
                    accept="image/png, image/jpeg"
                    className="opacity-0 w-full h-full absolute" />
                  Browse
                </div>
                
              </div>
            </div>
            <div className="ml-5 w-1/3">
              <div classNAme="mb-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">Showcase Name</label>
                <input
                  value={showcaseName}
                  onChange={(e) => setShowcaseName(e.target.value)}
                  placeholder="Enter showcase name"
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 w-52 px-4"
                  required="required"
                  type="text"
                  name="integration[shop_name]"
                  id="integration_shop_name" />
                <p className="text-red-500 text-xs">{showcaseNameError}</p>
              </div>
            </div>
          </div>
          <p className="text-xs mt-1 text-red-500">{iconFileError}</p>
          <button
            onClick={() => handleAddNewShowcase()}
            className="text-grey-lighter font-bold py-2 px-3 mt-4 text-white rounded text-sm bg-green-500 hover:bg-green-700 shadow-lg w-1/4">Add Showcase</button>
        </div>
      </div>
    </div>
  );
}