import React, {useState, useEffect} from 'react'
import {NavMenu} from '../components/NavMenu'
import {useHistory, useParams} from "react-router-dom";
import {uploadSnapshot} from '../apis/snapshots';
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json'

export const UploadNewSnapshotPage = () => {
  const history = useHistory();
  const {id} = useParams();
  const [snapshotName,
    setSnapshotName] = useState('')
  const [snapshotNameError, setSnapshotNameError] = useState('')
  const [snapshotDescription,
    setSnapshotDescription] = useState('')
  const [selectedFile,
    setSelectedFile] = useState(null)
  const [selectedFileError, setSelectedFileError] = useState('')
  const [loading,
    setLoading] = useState(false)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    isStopped: !loading
  };

  useEffect(() => {
    document.title = "Upload Snapshot"
  }, [])

  const clearError = () => {
    setSnapshotNameError('')
    setSelectedFileError('')
  }

  const handleUploadSnapshot = async() => {
    let isValid = true
    if(snapshotName == '') {
      isValid = false
      setSnapshotNameError("Snapshot Name cannot be blank!")
    }
    if(selectedFile == null) {
      isValid = false
      setSelectedFileError("You must select snapshot file to upload!")
    } else {
      const ext = selectedFile.name.slice(selectedFile.name.lastIndexOf('.') + 1)
      if(ext !== 'pth') {
        isValid = false
        setSelectedFileError("Invalid snapshot file. Snapshot file extension must be .pth")
      }
    }
    if(isValid) {
      clearError()
      setLoading(true)
      uploadSnapshot({snapshotName, snapshotFile: selectedFile, styleId: id, description: snapshotDescription}).then(() => {
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
        <Lottie options={defaultOptions} height={100} width={100}/>
      </div>
      <div className="w-1/5">
        <NavMenu activePage="Style List"/>
      </div>
      <div className="w-3/5 pt-5">
        <div className="flex items-center mb-6">
          <img
            alt="return icon"
            src="https://image.flaticon.com/icons/png/512/545/545680.png"
            onClick={() => history.push(`/styles/${id}`)}
            className="h-6 w-6 mr-5 cursor-pointer"/>
          <div className="text-2xl font-thin">Upload New Style's Snapshot</div>

        </div>
        <div className="font-medium text-xl mb-3">Basic Information</div>
        <div>
          <div className="">
            <div className="w-1/3">
              <div class="mb-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">Snapshot Name</label>
                <input
                  value={snapshotName}
                  onChange={(e) => setSnapshotName(e.target.value)}
                  placeholder="Enter Snapshot's Name"
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 w-52 px-4"
                  required="required"
                  type="text"
                  name="integration[shop_name]"
                  id="integration_shop_name"/>
                <p className="text-xs text-red-500">{snapshotNameError}</p>
              </div>
              <div class="mb-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">Brief information</label>
                <textarea
                  value={snapshotDescription}
                  onChange={(e) => setSnapshotDescription(e.target.value)}
                  placeholder="Enter Snapshot's brief information"
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg pt-2 h-32 w-52 px-4"
                  required="required"
                  type="text"
                  name="integration[shop_name]"
                  id="integration_shop_name"/>
                <p className="text-red text-xs hidden">Please fill out this field.</p>
              </div>
              <div className="mb-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">Snapshot File</label>
                <div class="grid grid-cols-1 space-y-2">
                  <div class="flex items-center justify-center w-full">
                    <label
                      class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                      <div
                        class="h-full w-full text-center flex flex-col items-center justify-center items-center cursor-pointer">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/> {selectedFile
                          ? (
                            <p>{selectedFile.name}</p>
                          )
                          : (
                            <p class="pointer-none text-gray-500 ">
                              Drag and drop files here
                              <br/>
                              or
                              <br/>
                              Select a file from your computer
                            </p>
                          )}
                      </div>
                      <input
                        onChange={(event) => {
                        setSelectedFile(event.target.files[0])
                      }}
                        type="file"
                        class="hidden"/>
                    </label>
                  </div>
                  <p className="text-xs text-red-500">{selectedFileError}</p>
                </div>
              </div>
              <button
                onClick={handleUploadSnapshot}
                className="text-grey-lighter font-bold py-2 px-3 mt-4 text-white rounded text-sm bg-green-500 hover:bg-green-700 shadow-lg w-full">Save</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}