import React, {useState, useEffect} from 'react'
import {StylesTable} from '../components/StylesTable'
import {fetchAllStyles} from '../apis/styles'
import { NavMenu } from '../components/NavMenu'

export const StyleListPage = () => {
  const [styles,
    setStyles] = useState([])

  useEffect(() => {
    fetchAllStyles().then(styles => {
      setStyles(styles)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className="flex h-screen">
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