import React, {useState, useEffect} from 'react'
import {StylesTable} from '../components/StylesTable'
import {fetchAllStyles, deleteStyle} from '../apis/styles'
import { NavMenu } from '../components/NavMenu'
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json'
import { useHistory } from 'react-router-dom';
export const StyleListPage = () => {
  const [loading, setLoading] = useState(false)
  const [styles, setStyles] = useState([])
  const history = useHistory()

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    isStopped: !loading
  };

  useEffect(() => {
    document.title = "Application's Style List"
    setLoading(true)
    fetchAllStyles().then(styles => {
      setStyles(styles)
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }, [])


  const handleDeleteStyle = async ({styleId}) => {
    setLoading(true)
    const response = await deleteStyle({styleId})
    if(response.id) {
      const newStyleList = styles.filter(style => style.id !== response.id)
      setStyles(newStyleList)
    }
    setLoading(false)
  }
  

  return (
    <div className="flex h-screen">
      <div className={loading ? "w-full flex items-center h-full absolute bg-white z-50" : "w-full flex items-center h-full absolute bg-white hidden"} 
      style={{backgroundColor: "rgba(0, 0, 0, 0.85)"}}>
        <Lottie options={defaultOptions}
          height={100}
          width={100}
          />
      </div>
      <div className="w-1/4 xl:w-1/5 2xl:w-1/6 fixed h-screen">
        <NavMenu activePage="Style List"/>
      </div>
      <div className="w-1/4 xl:w-1/5 2xl:w-1/6"></div>
      <div className="w-3/4 xl:w-4/5 px-9 2xl:w-5/6 pt-5 overflow-auto pb-10">
        <div className="text-2xl font-thin mt-10 mb-6">Application's Style List</div>
        <div className="my-4 flex justify-start">
          <button
            onClick={() => {
              history.push('/create-new-style')
            }}
            className="text-grey-lighter font-bold py-2 px-3 text-white rounded text-sm bg-blue-400 hover:bg-blue-600 shadow">Add New Style</button>
        </div>
        <StylesTable styles={styles} handleDeleteStyle = {handleDeleteStyle}/>
      </div>
    </div>

  );
}