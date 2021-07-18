import React, {useState, useEffect} from 'react'
import {NavMenu} from '../components/NavMenu'
import {useHistory, useParams} from "react-router-dom";
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json'
import { TrainingResultTalbe } from '../components/TrainingResultTable';
import { confirmAlert } from 'react-confirm-alert';
import {fetchTrainingRequestDetail} from '../apis/training-request'
import { fetchTrainningResultByRequestId } from '../apis/training-result'

export const TrainingDetailPage = () => {
  const history = useHistory();
  const { id } = useParams();

  const [loading,
    setLoading] = useState(false)

  const [trainingRequestDetail, setTrainingRequestDetail] = useState(null)
  const [trainingResults, setTrainingResults] = useState([])
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    isStopped: !loading
  };

  useEffect(() => {
    setLoading(true)
    fetchTrainingRequestDetail(id).then(trainingRequest => {
      const {id} = trainingRequest
      setTrainingRequestDetail(trainingRequest)
      fetchTrainningResultByRequestId(id).then(results => {
        setTrainingResults(results)
      })       
      setLoading(false)
    })
  }, [])

  const showStopAlert = () => {
    confirmAlert({
      overlayClassName: "darken",
      customUI: ({ onClose }) => {
        return (
          <div className="py-6 px-12 rounded-lg shadow-xl bg-white">
            <p className="font-bold text-xl text-center">Confirm Stop Training</p>
            <p className="font-thin text-sm mt-2 text-center">Please confirm that you are sure to stop training</p>
            <div className="flex items-center justify-center mt-4">
              <button onClick={async () => {
                onClose()
                
              }} className="bg-yellow-300 px-4 py-2 rounded-lg shadow-lg text-black text-base mx-2 font-medium">
                Stop
              </button>
              <button onClick={() => onClose()} className="bg-gray-800 px-4 py-2 rounded-lg shadow-lg text-white text-base mx-2 font-medium">Cancel</button>
            </div>
          </div>
        )
      }
    })
  }

  if(trainingRequestDetail !== null) {
    const {
      id, 
      checkpoint, 
      contentWeight, 
      description, 
      lr, 
      name, 
      numOfIterations,
      relu12Weight,
      relu22Weight,
      relu33Weight,
      relu43Weight,
      saveStep,
      status,
      styleAccessURL,
      styleWeight
    } = trainingRequestDetail

    

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
        <div className="w-4/5 pt-5">
          <div className="flex items-center mb-6">
            <img
              alt="Go back icon"
              src="https://image.flaticon.com/icons/png/512/545/545680.png"
              onClick={() => history.push('/training-history')}
              className="h-6 w-6 mr-5 cursor-pointer"/>
            <div className="text-2xl font-thin">Training Detail Page</div>
          </div>
          <div className="font-medium text-xl">{name}</div>
          <div className="text-sm mb-3">
            {description}
          </div>
          <div className="font-medium text-xl mb-3">Status: <button className="ml-1 text-sm bg-yellow-500 rounded-full px-3 text-white py-1">In progress</button></div>
          <div className="font-medium text-xl mb-3">Training Hyperparameters:</div>
          <div>
            <div className="flex">
              <div>
                <img
                  alt="Style Icon"
                  className="rounded-lg shadow-2xl h-44"
                  src={styleAccessURL}/>
              </div>
              <div className="ml-5 w-1/3">
              <p className="font-medium text-purple-800 text-sm mb-4">Training Parameters:</p>
                <div>
                  <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">lr:</span><button className="text-sm bg-blue-500 rounded-full w-12 text-white py-0.5">{lr.toExponential()}</button>
                  <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide ml-5">Save step:</span><button className="text-sm bg-blue-500 rounded-full w-12 text-white py-0.5">{saveStep}</button>
                  <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide ml-5">Num of iterations:</span><button className="text-sm bg-blue-500 rounded-full w-12 text-white py-0.5">{numOfIterations}</button>
                </div>
                <div className="mt-4">
                  <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">Content weight:</span><button className="text-sm bg-blue-500 rounded-full w-12 text-white py-0.5">{contentWeight.toExponential()}</button>
                  <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide ml-10">Style weight:</span><button className="text-sm bg-blue-500 rounded-full w-12 text-white py-0.5">{styleWeight.toExponential()}</button>
                </div>
                <div className="my-3 border"></div>
                <p className="font-medium text-purple-800 text-sm mb-4">Style Layer Weight Parameters:</p>
                <div>
                  <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">Relu1_2:</span><button className="text-sm bg-purple-500 rounded-full w-12 text-white py-0.5">{relu12Weight}</button>
                  <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide ml-10">Relu2_2:</span><button className="text-sm bg-purple-500 rounded-full w-12 text-white py-0.5">{relu22Weight}</button>
                </div>
                <div className="mt-4">
                  <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">Relu3_3:</span><button className="text-sm bg-purple-500 rounded-full w-12 text-white py-0.5">{relu33Weight}</button>
                  <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide ml-10">Relu4_3:</span><button className="text-sm bg-purple-500 rounded-full w-12 text-white py-0.5">{relu43Weight}</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-7">
            <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">Checkpoint:</span><button className="text-sm bg-green-500 rounded-full w-12 text-white py-0.5">{checkpoint}</button>
            <button className="px-2 py-1 bg-red-400 text-white font-medium text-sm rounded shadow ml-4 hover:bg-red-600" onClick={() => showStopAlert()}>Stop training</button>
          </div>
          <div className="font-medium text-xl mt-5 flex items-center">Training Results: <img className="ml-2 cursor-pointer w-5" src="https://image.flaticon.com/icons/png/512/545/545661.png"/></div>
          <TrainingResultTalbe results={trainingResults}/>
        </div>
      </div>
    );
  } else {
    return null
  }
}