'use client'

import { useState } from 'react'
import CentreTitle from '../header/menubar/CentreTitle'
import UploadHeader from '../ui/uploadHeader/uploadHeader'
import DragDropInput from './dragDropInput/dragDropInput'
import classes from './excelUpload.module.css'

export default function ExcelUpload() {

  const [userStoryData, setUserStoryData] = useState([])

  return (
    <div className={classes.container}>
      <CentreTitle />
      <UploadHeader uploadType={'excel'}/>
      <DragDropInput setUserStoryData={setUserStoryData}/>
    </div>
  )
}
