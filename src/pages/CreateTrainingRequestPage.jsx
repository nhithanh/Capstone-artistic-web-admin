import React, {useState, useEffect} from 'react'
import {NavMenu} from '../components/NavMenu'
import {useHistory} from "react-router-dom";
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json'
import {createNewTrainingRequest} from '../apis/training-request';
import {toast, ToastContainer} from 'react-toastify'


function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export const CreateTrainingRequestPage = () => {
  const history = useHistory();
  const [styleFile, setStyleFile] = useState(null)
  const [styleFileError, setStyleFileError] = useState('')

  const [name,setName] = useState('')
  const [nameError, setNameError] = useState('')

  const [description, setDescription] = useState('')

  const [numOfIterations,setNumOfIterations] = useState(20000)
  const [numOfIterationsError, setNumOfIterationsError] = useState('')

  const [lr,setLr] = useState(0.001)
  const [lrError, setLrError] = useState('')

  const [saveStep, setSaveStep] = useState(1000)
  const [saveStepError, setSaveStepError] = useState('')

  const [contentWeight, setContentWeight] = useState(1000)
  const [contentWeightError, setContentWeightError] = useState('')

  const [styleWeight,setSStyleWeight] = useState(100000)
  const [styleWeightError, setStyleWeightError] = useState('')

  const [relu12, setRelu12] = useState(0.8)
  const [relu12Error, setRelu12Error] = useState('')

  const [relu22, setRelu22] = useState(0.5)
  const [relu22Error, setRelu22Error] = useState('')

  const [relu33, setRelu33] = useState(0.3)
  const [relu33Error, setRelu33Error] = useState('')

  const [relu43, setRelu43] = useState(0.1)
  const [relu43Error, setRelu43Error] = useState('')

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

  const clearError = () => {
    setNameError('')
    setStyleFileError('')
    setLrError('')
    setNumOfIterationsError('')
    setSaveStepError('')
    setContentWeightError('')
    setStyleWeightError('')
    setRelu12Error('')
    setRelu22Error('')
    setRelu33Error('')
    setRelu43Error('')
  }

  const handleCreateNewTrainingRequest = () => {
    clearError()
    let isValid = true;

    if(styleFile == null) {
      isValid = false
      toast.error('Please select referece style for the training!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
    else {
      let fileType = styleFile.type
      if(fileType.split("/")[0] !== "image") {
        isValid = false
        toast.error('Style Image must be valid image file!', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
    }

    if(name === '') {
      isValid = false
      setNameError('Name cannot be blank!')
    }
    if(isNumeric(lr) === false) {
      isValid = false
      setLrError('lr must be a number!')
    }
    if(isNumeric(saveStep) === false) {
      isValid = false
      setSaveStepError('Save step must be a number!')
    }
    if(isNumeric(numOfIterations) === false) {
      isValid = false
      setNumOfIterationsError('Iteration must be a number!')
    }
    if(isNumeric(styleWeight) === false) {
      isValid = false
      setStyleWeightError('Style weight must be a number!')
    }
    if(isNumeric(contentWeight) === false) {
      isValid = false
      setContentWeightError('Content weight must be a number!')
    }
    if(isNumeric(relu12) === false) {
      isValid = false
      setRelu12Error('Relu1_2 weight must be a nubmer!')
    }
    if(isNumeric(relu22) === false) {
      isValid = false
      setRelu22Error('Relu2_2 weight must be a number')
    }
    if(isNumeric(relu33) === false) {
      isValid = false
      setRelu33Error('Relu3_3 weight must be a nubmer!')
    }
    if(isNumeric(relu43) === false) {
      isValid = false
      setRelu43Error('Relu4_3 weight must be a number')
    }
    if(isValid === true) {
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
  }

  return (
    <div className="flex h-screen">
      <ToastContainer/>
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
            placeholder="Enter Training Request Name"
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 w-52 px-4"
            required="required"
            type="text"
            name="integration[shop_name]"
            id="integration_shop_name"/>
          <p className="text-xs text-red-500">{nameError}</p>
        </div>
        <div class="mb-3 space-y-2 w-full text-xs">
          <label className="font-semibold text-gray-600 py-2">Brief description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Training Request brief information"
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg pt-2 h-32 w-52 px-4"
            required="required"
            type="text"
            name="integration[shop_name]"
            id="integration_shop_name"/>
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
                <div className="flex">
                  <div>
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
                      <p className="text-xs text-red-500 mt-1">{lrError}</p>
                  </div>
                  <div className="ml-8">
                    <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">Save step:</span>
                    <input
                      value={saveStep}
                      onChange={(e) => setSaveStep(e.target.value)}
                      placeholder="Save Step"
                      className="appearance-none bg-grey-lighter text-grey-darker text-xs border border-grey-lighter rounded-lg h-10 w-32 px-4"
                      required="required"
                      type="text"
                      name="integration[shop_name]"
                      id="integration_shop_name"/>
                    <p className="text-xs text-red-500 mt-1">{saveStepError}</p>
                  </div>
                  <div className="ml-8">
                    <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">Num of iterations:</span>
                    <input
                      value={numOfIterations}
                      onChange={(e) => setNumOfIterations(e.target.value)}
                      placeholder="Num of iterations"
                      className="appearance-none bg-grey-lighter text-grey-darker text-xs border border-grey-lighter rounded-lg h-10 w-32 px-4"
                      required="required"
                      type="text"
                      name="integration[shop_name]"
                      id="integration_shop_name"/>
                      <p className="text-xs mt-1 text-red-500">{numOfIterationsError}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex">
                <div>
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
                  <p className="text-xs text-red-500 mt-1">{contentWeightError}</p>
                </div>
                <div className="ml-8">
                  <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">Style weight:</span>
                  <input
                    value={styleWeight}
                    onChange={(e) => setSStyleWeight(e.target.value)}
                    placeholder="Style Weight"
                    className="appearance-none bg-grey-lighter text-grey-darker text-xs border border-grey-lighter rounded-lg h-10 w-32 px-4"
                    required="required"
                    type="text"
                    name="integration[shop_name]"
                    id="integration_shop_name"/>
                    <p className="text-xs text-red-500 mt-1">{styleWeightError}</p>
                </div>
                
              </div>
              <div className="my-3 border"></div>
              <div>
                <p className="font-medium text-purple-600 text-sm mb-4">Style Layer Weight Parameters:</p>
                <div className="flex">
                  <div>
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
                    <p className="text-xs text-red-500 mt-1">{relu12Error}</p>
                  </div>
                  <div className="ml-8">
                    <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">Relu2_2:</span>
                    <input
                      value={relu22}
                      onChange={(e) => setRelu22(e.target.value)}
                      placeholder="Relu2_2 weight"
                      className="appearance-none bg-grey-lighter text-grey-darker text-xs border border-grey-lighter rounded-lg h-10 w-32 px-4"
                      required="required"
                      type="text"
                      name="integration[shop_name]"
                      id="integration_shop_name"/>
                    <p className="text-xs text-red-500 mt-1">{relu22Error}</p>

                  </div>
                </div>
              </div>
              <div className="mt-4 flex">
                <div>
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
                  <p className="text-xs text-red-500 mt-1">{relu33Error}</p>
                </div>
                <div className="ml-8">
                  <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">Relu4_3:</span>
                  <input
                    value={relu43}
                    onChange={(e) => setRelu43(e.target.value)}
                    placeholder="Relu4_3 weight"
                    className="appearance-none bg-grey-lighter text-grey-darker text-xs border border-grey-lighter rounded-lg h-10 w-32 px-4"
                    required="required"
                    type="text"
                    name="integration[shop_name]"
                    id="integration_shop_name"/>
                  <p className="text-xs text-red-500 mt-1">{relu43Error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => handleCreateNewTrainingRequest()}
            className="text-base font-medium px-7 py-1 bg-green-500 text-white rounded shadow mt-6">Create Training Request</button>
        </div>
       
      </div>
    </div>
  );
}