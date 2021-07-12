import React, {useState, useEffect} from 'react'
import {StylesTable} from '../components/StylesTable'
import {fetchAllStyles} from '../apis/styles'

export const StyleListPage = () => {
  const [styles, setStyles] = useState([])

  useEffect(() => {
    fetchAllStyles().then(styles => {
      setStyles(styles)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div>
      <StylesTable styles={styles}/>
    </div>
  );
}