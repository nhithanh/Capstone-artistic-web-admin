import React, {useState, useEffect} from 'react'
import {SnapshotTable} from '../components/SnapshotTable'
import {fetchStyleDetail, updateStyle, updateStyleWithIconChange} from '../apis/styles'
import {NavMenu} from '../components/NavMenu'
import {useHistory, useParams} from "react-router-dom";
import {fetchAllSnapshots} from '../apis/snapshots';
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json'
import {deleteSnapshot} from '../apis/snapshots'
import {ShowcaseTable} from '../components/ShowcasesTable'
import {fetchAllShowcases} from '../apis/showcases';
import {deleteShowcase} from '../apis/showcases'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const StyleDetailPage = () => {
  const history = useHistory();
  const {id} = useParams();
  const [activeSnapshotId,
    setActiveSnapshotId] = useState("")
  const [iconFile,
    setIconFile] = useState(null)
  const [iconURL,
    setIconURL] = useState(null)
  const [styleName,
    setStyleName] = useState(null)
  const [status,
    setStatus] = useState(true)
  const [snapshots,
    setSnapshots] = useState([])
  const [loading,
    setLoading] = useState(false)
  const [showcases,
    setShowcases] = useState([])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    isStopped: !loading
  };

  useEffect(() => {
    setLoading(true)
    fetchAllShowcases(id).then(showcases => {
      setShowcases(showcases)
    })
    fetchAllSnapshots(id).then(data => {
      setSnapshots(data)
      fetchStyleDetail(id).then(data => {
        setIconURL(data.iconURL)
        setStyleName(data.styleName)
        setStatus(data.isActive)
        setActiveSnapshotId(data.activeSnapshotId)
        setLoading(false)
      }).catch(err => {
        setLoading(false)
        console.log(err)
      });
    }).catch(err => {
      setLoading(false)
    })
  }, [])

  const handleUpdateStyle = () => {
    let isValid = true
    const activeSnapshotId_ = activeSnapshotId == "" ? null : activeSnapshotId
    
    if(status == true) {
      if(activeSnapshotId_ == null) {
        isValid = false
        toast.error('Cannot active style without active snapshot id!', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          });
      }
    }
    if(isValid) {
      setLoading(true)
      if (iconFile) {
        updateStyleWithIconChange({id, styleName, iconFile, isActive: status, activeSnapshotId: activeSnapshotId_}).then(() => setLoading(false))
      } else {
        updateStyle({id, styleName, isActive: status, activeSnapshotId: activeSnapshotId_}).then(() => setLoading(false))
      }
    }
  }

  const handleDeleteSnapshot = async({snapshotId}) => {
    setLoading(true)
    const response = await deleteSnapshot({snapshotId})
    if (response.id !== undefined) {
      const newSnapshots = snapshots.filter(snapshot => snapshot.id !== response.id)
      setSnapshots(newSnapshots)
    }
    setLoading(false)
  }

  const handleDeleteShowcase = async({showcaseId}) => {
    setLoading(true)
    const response = await deleteShowcase({showcaseId})
    if (response.id !== undefined) {
      const newShowCases = showcases.filter(showcase => showcase.id !== response.id)
      setShowcases(newShowCases)
    }
    setLoading(false)
  }

  return (
    <div className="flex">
      <ToastContainer/>
      <div
        className={loading
        ? "w-full z-50 flex items-center h-full absolute bg-white"
        : "w-full flex items-center h-full absolute bg-white hidden"}
        style={{
        backgroundColor: "rgba(0, 0, 0, 0.85)"
      }}>
        <Lottie options={defaultOptions} height={100} width={100}/>
      </div>
      <div className="w-1/5 fixed h-screen">
        <NavMenu activePage="Style List"/>
      </div>
      <div className="w-1/5"></div>
      <div className="w-3/5 pt-5">
        <div className="flex items-center mb-6">
          <img
            alt="Go back icon"
            src="https://image.flaticon.com/icons/png/512/545/545680.png"
            onClick={() => history.push('/styles')}
            className="h-6 w-6 mr-5 cursor-pointer"/>
          <div className="text-2xl font-thin">Application's Style Detail</div>

        </div>
        <div className="font-medium text-xl mb-3">Basic Information</div>
        <div>
          <div className="flex">
            <div>
              <img className="rounded-lg shadow-2xl h-44" src={iconFile ? URL.createObjectURL(iconFile) : iconURL}></img>

              <div className="mt-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">Style Icon:</label>
                <div
                  className="relative text-grey-lighter w-20 cursor-pointer font-bold py-1 px-3 mt-4 text-white rounded text-sm bg-blue-500 hover:bg-blue-700">
                  <input
                    onChange={(event) => {
                    setIconFile(event.target.files[0])
                  }}
                    type="file"
                    accept="image/png, image/jpeg"
                    className="cursor-pointer opacity-0 w-full h-full absolute"/>
                  Browse
                </div>
              </div>
            </div>
            <div className="ml-5 w-1/3">
              <div class="mb-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">Style Name</label>
                <input
                  value={styleName}
                  placeholder="Enter Style's Name"
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 w-52 px-4"
                  required="required"
                  onChange = {event => {
                    setStyleName(event.target.value)
                  }}
                  type="text"/>
                <p className="text-red text-xs hidden">Please fill out this field.</p>
              </div>
              <div className="mb-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                  <option value={true}>Active</option>
                  <option value={false}>Deactive</option>
                </select>
                <p className="text-red text-xs hidden">Please fill out this field.</p>
              </div>
              <div class="mb-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">Active snapshot</label>
                <select
                  value={activeSnapshotId}
                  onChange={(e) => {
                  setActiveSnapshotId(e.target.value)
                }}
                  className="w-full border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                  <option value="">Select active snapshot</option>
                  {snapshots.map(snapshot => {
                    return <option value={snapshot.id}>{snapshot.name}</option>
                  })
}
                </select>
                <p className="text-red text-xs hidden">Please fill out this field.</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleUpdateStyle()}
            className="text-grey-lighter font-bold py-2 px-3 mt-4 text-white rounded text-sm bg-green-500 hover:bg-green-700 shadow-lg w-1/4">Save</button>
        </div>

        <div className="font-medium text-xl mb-3 mt-10">Style's Snapshot List</div>
        <div className="my-4 flex">
          <button
            onClick={() => history.push(`/styles/${id}/upload-snapshot`)}
            className="text-grey-lighter font-bold py-2 px-3 text-white rounded text-sm bg-blue-500 hover:bg-blue-700 shadow">Upload New Snapshot</button>
        </div>
        <SnapshotTable
          snapshots={snapshots}
          handleDeleteSnapshot={handleDeleteSnapshot}
          activeSnapshotId={activeSnapshotId}/>
        <div className="font-medium text-xl mb-3 mt-10">Style's Showcase List</div>
        <div className="my-4 flex">
          <button
            onClick={() => history.push(`/styles/${id}/upload-showcase`)}
            className="text-grey-lighter font-bold py-2 px-3 text-white rounded text-sm bg-blue-500 hover:bg-blue-700 shadow">Upload New Showcase Image</button>
        </div>
        <ShowcaseTable
          showcases={showcases}
          handleDeleteShowcase={handleDeleteShowcase}/>
        <div className="mb-20"></div>
      </div>
    </div>
  );
}