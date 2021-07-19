import React, {useState, useEffect} from 'react'
import {NavMenu} from '../components/NavMenu'
import {useHistory} from "react-router-dom";
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json'
import {createNewTrainingRequest} from '../apis/training-request';

export const CreateTrainingRequestPage = () => {
  const history = useHistory();
  const [styleFile,
    setStyleFile] = useState(null)

  const [name,
    setName] = useState('')

  const [description,
    setDescription] = useState('')

  const [numOfIterations,
    setNumOfIterations] = useState(10)

  const [lr,
    setLr] = useState(0.001)
  const [saveStep,
    setSaveStep] = useState(1000)

  const [contentWeight,
    setContentWeight] = useState(1000)

  const [styleWeight,
    setSStyleWeight] = useState(100000)

  const [relu12,
    setRelu12] = useState(0.8)

  const [relu22,
    setRelu22] = useState(0.5)

  const [relu33,
    setRelu33] = useState(0.3)

  const [relu43,
    setRelu43] = useState(0.1)

  const [loading,
    setLoading] = useState(false)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    isStopped: !loading
  };

  useEffect(() => {
    document.title = "Create Training Request"
  }, [])

  const handleCreateNewTrainingRequest = () => {
    setLoading(true)
    createNewTrainingRequest({
      name,
      contentWeight,
      numOfIterations,
      description,
      lr,
      referenceStyleFile: styleFile,
      relu12Weight: relu12,
      relu22Weight: relu22,
      relu33Weight: relu33,
      relu43Weight: relu43,
      saveStep,
      styleWeight
    }).then(rs => {
      setLoading(false)
      history.push('/training-requests')
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
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
        <NavMenu activePage="Training Requests"/>
      </div>
      <div className="w-3/5 pt-5">
        <div className="flex items-center mb-6">
          <img
            alt="Go back icon"
            src="https://image.flaticon.com/icons/png/512/545/545680.png"
            onClick={() => history.push('/training-requests')}
            className="h-6 w-6 mr-5 cursor-pointer"/>
          <div className="text-2xl font-thin">Create Training Request</div>

        </div>
        <div className="font-medium text-xl mb-3">Basic Information:</div>
        <div class="mb-3 space-y-2 w-full text-xs">
          <label className="font-semibold text-gray-600 py-2">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Snapshot's Name"
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 w-52 px-4"
            required="required"
            type="text"
            name="integration[shop_name]"
            id="integration_shop_name"/>
        </div>
        <div class="mb-3 space-y-2 w-full text-xs">
          <label className="font-semibold text-gray-600 py-2">Brief description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Snapshot's brief information"
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg pt-2 h-32 w-52 px-4"
            required="required"
            type="text"
            name="integration[shop_name]"
            id="integration_shop_name"/>
          <p className="text-red text-xs hidden">Please fill out this field.</p>
        </div>
        <div className="font-medium text-xl mb-3">Training Hyperparameters:</div>
        <div>
          <div className="flex">
            <div>
              <img
                alt="Style Icon"
                className="rounded-lg shadow h-44"
                src={styleFile
                ? URL.createObjectURL(styleFile)
                : "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600." +
                  "jpg"}/>

              <div class="mt-3 space-y-2 w-full text-xs flex items-end">
                <label className="font-semibold text-gray-600 py-2">Style Icon:</label>
                <div
                  className="relative text-grey-lighter font-bold py-1 px-3 mt-4 text-white rounded text-sm bg-blue-500 hover:bg-blue-700 ml-3">
                  <input
                    onChange={(event) => {
                    setStyleFile(event.target.files[0])
                  }}
                    type="file"
                    accept="image/png, image/jpeg"
                    class="opacity-0 w-full h-full absolute"/>
                  Browse
                </div>
              </div>
            </div>
            <div className="ml-5 w-2/3">
              <div>
                <p className="font-medium text-purple-600 text-sm mb-4">Training Parameters:</p>

                <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">lr:</span>
                <input
                  value={lr}
                  onChange={(e) => setLr(e.target.value)}
                  placeholder="Learning Rate"
                  className="appearance-none bg-grey-lighter text-grey-darker text-xs border border-grey-lighter rounded-lg h-10 w-32 px-4"
                  required="required"
                  type="text"
                  name="integration[shop_name]"
                  id="integration_shop_name"/>
                <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide ml-8">Save step:</span>
                <input
                  value={saveStep}
                  onChange={(e) => setSaveStep(e.target.value)}
                  placeholder="Save Step"
                  className="appearance-none bg-grey-lighter text-grey-darker text-xs border border-grey-lighter rounded-lg h-10 w-32 px-4"
                  required="required"
                  type="text"
                  name="integration[shop_name]"
                  id="integration_shop_name"/>

                <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide ml-8">Num of iterations:</span>
                <input
                  value={numOfIterations}
                  onChange={(e) => setNumOfIterations(e.target.value)}
                  placeholder="Save Step"
                  className="appearance-none bg-grey-lighter text-grey-darker text-xs border border-grey-lighter rounded-lg h-10 w-32 px-4"
                  required="required"
                  type="text"
                  name="integration[shop_name]"
                  id="integration_shop_name"/>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">Content weight:</span>
                <input
                  value={contentWeight}
                  onChange={(e) => setContentWeight(e.target.value)}
                  placeholder="Content Weight"
                  className="appearance-none bg-grey-lighter text-grey-darker text-xs border border-grey-lighter rounded-lg h-10 w-32 px-4"
                  required="required"
                  type="text"
                  name="integration[shop_name]"
                  id="integration_shop_name"/>
                <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide ml-10">Style weight:</span>
                <input
                  value={styleWeight}
                  onChange={(e) => setSStyleWeight(e.target.value)}
                  placeholder="Style Weight"
                  className="appearance-none bg-grey-lighter text-grey-darker text-xs border border-grey-lighter rounded-lg h-10 w-32 px-4"
                  required="required"
                  type="text"
                  name="integration[shop_name]"
                  id="integration_shop_name"/>
              </div>
              <div className="my-3 border"></div>
              <div>
                <p className="font-medium text-purple-600 text-sm mb-4">Style Layer Weight Parameters:</p>
                <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">Relu1_2:</span>
                <input
                  value={relu12}
                  onChange={(e) => setRelu12(e.target.value)}
                  placeholder="Relu1_2 weight"
                  className="appearance-none bg-grey-lighter text-grey-darker text-xs border border-grey-lighter rounded-lg h-10 w-32 px-4"
                  required="required"
                  type="text"
                  name="integration[shop_name]"
                  id="integration_shop_name"/>
                <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide ml-10">Relu2_2:</span>
                <input
                  value={relu22}
                  onChange={(e) => setRelu22(e.target.value)}
                  placeholder="Relu2_2 weight"
                  className="appearance-none bg-grey-lighter text-grey-darker text-xs border border-grey-lighter rounded-lg h-10 w-32 px-4"
                  required="required"
                  type="text"
                  name="integration[shop_name]"
                  id="integration_shop_name"/>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">Relu3_3:</span>
                <input
                  value={relu33}
                  onChange={(e) => setRelu33(e.target.value)}
                  placeholder="Relu3_3 weight"
                  className="appearance-none bg-grey-lighter text-grey-darker text-xs border border-grey-lighter rounded-lg h-10 w-32 px-4"
                  required="required"
                  type="text"
                  name="integration[shop_name]"
                  id="integration_shop_name"/>
                <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide ml-10">Relu4_3:</span>
                <input
                  value={relu43}
                  onChange={(e) => setRelu43(e.target.value)}
                  placeholder="Relu4_3 weight"
                  className="appearance-none bg-grey-lighter text-grey-darker text-xs border border-grey-lighter rounded-lg h-10 w-32 px-4"
                  required="required"
                  type="text"
                  name="integration[shop_name]"
                  id="integration_shop_name"/>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => handleCreateNewTrainingRequest()}
          className="text-base font-medium px-7 py-1 bg-green-500 text-white rounded shadow mt-6">Create Training Request</button>
      </div>
    </div>
  );
}