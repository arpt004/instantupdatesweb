import Link from 'next/link'
import Button from '../button'
import classes from './uploadHeader.module.css'

export default function UploadHeader({uploadType}) {
  return (
    <div className={classes.container}>
      <div className={classes.back}>
        <Link href={'/'}>
            <Button text={'Back'} /> 
        </Link>
      </div>
      <div className={classes.uploadType}>
        <Link href={ uploadType==='single' ? './excel-upload' : './single-upload' }>
            <Button text={ uploadType==='single' ? 'Excel Upload':' Single Upload'} />
        </Link>
      </div>
    </div>
  )
}
