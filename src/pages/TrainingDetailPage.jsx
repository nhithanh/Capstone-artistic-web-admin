import React, {useState} from 'react'
import {NavMenu} from '../components/NavMenu'
import {useHistory} from "react-router-dom";
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json'
import { TrainingResultTalbe } from '../components/TrainingResultTable';

export const TrainingDetailPage = () => {
  const history = useHistory();
  const [loading,
    setLoading] = useState(false)
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    isStopped: !loading
  };

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
        <div className="font-medium text-xl">Udnie v2</div>
        <div className="text-sm mb-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non velit velit. In at arcu eget nibh molestie ultrices. Phasellus lacinia tellus eget nulla hendrerit, eu mollis augue iaculis. Phasellus ac mattis ex, nec porttitor diam. Fusce gravida velit eget sodales placerat. Nulla maximus feugiat nulla, et molestie tortor varius eu. Integer volutpat varius lectus ac aliquam. Nullam accumsan elit ut nunc tristique pulvinar.
        </div>
        <div className="font-medium text-xl mb-3">Status: <button className="ml-1 text-sm bg-yellow-500 rounded-full px-3 text-white py-1">In progress</button></div>
        <div className="font-medium text-xl mb-3">Training Hyperparameters:</div>
        <div>
          <div className="flex">
            <div>
              <img
                alt="Style Icon"
                className="rounded-lg shadow-2xl h-44"
                src="https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Francis_Picabia%2C_1913%2C_Udnie_%28Young_American_Girl%2C_The_Dance%29%2C_oil_on_canvas%2C_290_x_300_cm%2C_Mus%C3%A9e_National_d%E2%80%99Art_Moderne%2C_Centre_Georges_Pompidou%2C_Paris..jpg/1023px-Francis_Picabia%2C_1913%2C_Udnie_%28Young_American_Girl%2C_The_Dance%29%2C_oil_on_canvas%2C_290_x_300_cm%2C_Mus%C3%A9e_National_d%E2%80%99Art_Moderne%2C_Centre_Georges_Pompidou%2C_Paris..jpg  "/>
            </div>
            <div className="ml-5 w-1/3">
            <p className="font-medium text-purple-800 text-sm mb-4">Training Parameters:</p>
              <div>
                <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">lr:</span><button className="text-sm bg-blue-500 rounded-full w-12 text-white py-0.5">1e-3</button>
                <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide ml-5">Save step:</span><button className="text-sm bg-blue-500 rounded-full w-12 text-white py-0.5">1e-3</button>
                <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide ml-5">Num of iterations:</span><button className="text-sm bg-blue-500 rounded-full w-12 text-white py-0.5">1e-3</button>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">Content weight:</span><button className="text-sm bg-blue-500 rounded-full w-12 text-white py-0.5">1e5</button>
                <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide ml-10">Style weight:</span><button className="text-sm bg-blue-500 rounded-full w-12 text-white py-0.5">1e10</button>
              </div>
              <div className="my-3 border"></div>
              <p className="font-medium text-purple-800 text-sm mb-4">Style Layer Weight Parameters:</p>
              <div>
                <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">Relu1_2:</span><button className="text-sm bg-purple-500 rounded-full w-12 text-white py-0.5">0.7</button>
                <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide ml-10">Relu2_2:</span><button className="text-sm bg-purple-500 rounded-full w-12 text-white py-0.5">0.6</button>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">Relu3_3:</span><button className="text-sm bg-purple-500 rounded-full w-12 text-white py-0.5">0.4</button>
                <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide ml-10">Relu4_3:</span><button className="text-sm bg-purple-500 rounded-full w-12 text-white py-0.5">0.2</button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-7">
          <span className="text-sm font-medium mr-2 text-gray-900 tracking-wide">Checkpoint:</span><button className="text-sm bg-green-500 rounded-full w-12 text-white py-0.5">5000</button>
        </div>
        <div className="font-medium text-xl mt-5">Training Results:</div>
        <TrainingResultTalbe results={[{}]}/>
      </div>
    </div>
  );
}