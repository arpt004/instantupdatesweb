import UploadHeader from '../ui/uploadHeader/uploadHeader'
import classes from './excelUpload.module.css'

export default function ExcelUpload() {
  return (
    <div className={classes.container}>
      <UploadHeader uploadType={'excel'}/>
    </div>
  )
}
