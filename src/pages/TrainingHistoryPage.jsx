import React, {useState, useEffect} from 'react'
import {NavMenu} from '../components/NavMenu'
import {useHistory} from "react-router-dom";
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json'
import {TrainingHistoryTable} from '../components/TrainingHistoryTable';
import {fetchAllTrainingRequest} from '../apis/training-request'
import { useDispatch } from 'react-redux'
import { setTrainingReqests } from '../redux/slicers/training-request'
import backIcon from '../assets/back.png'

export const TrainingHistoryPage = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false)
  
  const dispatch = useDispatch()

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    isStopped: !loading
  };

  const loadTrainingRequests = () => {
    setLoading(true)
    fetchAllTrainingRequest().then(rs=> {
      let data = {}
      for(let item of rs) {
        data[item.id] = item
      }
      console.log(data)
      dispatch(setTrainingReqests(data))
      setLoading(false)
    })
  }

  useEffect(() => {
    document.title = "Training Requests"
    loadTrainingRequests()
  }, [])

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
      <div className="w-1/4 xl:w-1/5 2xl:w-1/6 fixed h-screen">
        <NavMenu activePage="Training Requests"/>
      </div>
      <div className="w-1/4 xl:w-1/5 2xl:w-1/6"></div>
      <div className="w-3/4 xl:w-4/5 px-9 2xl:w-5/6 pt-5 overflow-auto pb-10">
        <div className="flex items-center mb-6">
          <img
            alt="Go back icon"
            src={backIcon}
            onClick={() => history.push('/styles')}
            className="h-6 w-6 mr-5 cursor-pointer"/>
          <div className="text-2xl font-thin">Training Requests</div>
          
        </div>
        <div className="my-4 flex justify-start">
            <button
              onClick={() => {
              history.push('/create-training-request')
            }}
              className="text-grey-lighter font-bold py-2 px-3 text-white rounded text-sm bg-blue-400 hover:bg-blue-600 shadow">Create Training Request</button>
          </div>
          <TrainingHistoryTable/>
      </div>
    </div>
  );
}