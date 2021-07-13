import React, {useState, useEffect} from 'react'
import {StylesTable} from '../components/StylesTable'
import {fetchAllStyles} from '../apis/styles'
import { NavMenu } from '../components/NavMenu'
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json'

export const StyleListPage = () => {
  const [loading, setLoading] = useState(false)
  const [styles, setStyles] = useState([])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    isStopped: !loading
  };
  

  useEffect(() => {
    setLoading(true)
    fetchAllStyles().then(styles => {
      setStyles(styles)
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }, [])

  

  return (
    <div className="flex h-screen">
      <div className={loading ? "w-full flex items-center h-full absolute bg-white" : "w-full flex items-center h-full absolute bg-white hidden"} 
      style={{backgroundColor: "rgba(0, 0, 0, 0.85)"}}>
        <Lottie options={defaultOptions}
          height={100}
          width={100}
          />
      </div>
      <div className="w-1/5">
        <NavMenu activePage="Style List"/>
      </div>
      <div className="w-3/5">
        <div className="text-2xl font-thin mt-10 mb-6">Application's Style List</div>
        <div className="my-4 flex justify-start">
          <button
            className="text-grey-lighter font-bold py-2 px-3 text-white rounded text-sm bg-blue-400 hover:bg-blue-600 shadow">Add New Style</button>
        </div>
        <StylesTable styles={styles}/>
      </div>
    </div>

  );
}