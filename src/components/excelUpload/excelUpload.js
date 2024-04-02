'use client'

import { useState } from 'react'
import CentreTitle from '../header/menubar/CentreTitle'
import UploadHeader from '../ui/uploadHeader/uploadHeader'
import DragDropInput from './dragDropInput/dragDropInput'
import classes from './excelUpload.module.css'

export default function ExcelUpload() {

  const [userStoryData, setUserStoryData] = useState([])

  return (
    <>
      <CentreTitle />
      <div className={classes.shadow}>
        <div className={classes.container}>
          <UploadHeader uploadType={'excel'}/>
        </div>
      </div>
      <div className={classes.container}>
        <DragDropInput setUserStoryData={setUserStoryData}/>
      </div>
    </>
  )
}
