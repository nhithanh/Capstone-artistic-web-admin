import React, {useState, useEffect} from 'react'
import {createNewStyle} from '../apis/styles'
import {NavMenu} from '../components/NavMenu'
import {useHistory} from "react-router-dom";
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json'
import {TrainingHistoryTable} from '../components/TrainingHistoryTable';
import {fetchAllTrainingRequest} from '../apis/training-request'

export const TrainingHistoryPage = () => {
  const [trainingRequests, setTrainingRequests] = useState([])


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
    fetchAllTrainingRequest().then(rs=> {
      console.log("rs:", rs)
      setTrainingRequests(rs)
    })
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
      <div className="w-1/5">
        <NavMenu activePage="Training History"/>
      </div>
      <div className="w-4/5 pt-5 mx-10">
        <div className="flex items-center mb-6">
          <img
            alt="Go back icon"
            src="https://image.flaticon.com/icons/png/512/545/545680.png"
            onClick={() => history.push('/styles')}
            className="h-6 w-6 mr-5 cursor-pointer"/>
          <div className="text-2xl font-thin">Training History</div>
          
        </div>
        <div className="my-4 flex justify-start">
            <button
              onClick={() => {
              history.push('/create-training-request')
            }}
              className="text-grey-lighter font-bold py-2 px-3 text-white rounded text-sm bg-blue-400 hover:bg-blue-600 shadow">Create Training Request</button>
          </div>
          <TrainingHistoryTable trainingRequests={trainingRequests}/>
      </div>
    </div>
  );
}