'use client'

import { useState } from 'react';
import Button from '../ui/button';
import Input from '../ui/input';
import Select from '../ui/select';
import TextArea from '../ui/textarea';
import UploadHeader from '../ui/uploadHeader/uploadHeader';
import classes from './singleUpload.module.css';
import { categories } from '@/data/allCategories';
import Loader from '../common/Loader/loader';
import Message from '../common/Message/message';
import { setMessageDetails } from '@/components/utils/utils';
import CentreTitle from '../header/menubar/CentreTitle';
import Link from 'next/link';



export default function SingleUpload() {

  const [formData, setFromData] = useState({})
  const [imageFile, setImageFile] = useState();
  const [imageFilename, setImageFilename] = useState('');
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState(false);
  const [messageData, setMessageData] = useState({});
  const [triggerNotify, setTriggerNotify] = useState(false);
  const [notifyTitle, setNotifyTitle] = useState('');
  const [notifyText, setNotifyText] = useState('');

  async function handleSubmit() {
    setLoader(true);
    try{
      const uploadResponse = await fetch(`/api/uploadImage?filename=${imageFilename}`,
        {
          method: 'POST',
          body: imageFile,
        },
      );
      if(uploadResponse.ok){
        const res = await uploadResponse.json()
        const getFormData = formData;
        getFormData['image'] = res.url
        const responseInsertOne = await fetch( `/api/insertOne`, 
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(getFormData),
          },
        );
        console.log(responseInsertOne)
        if(responseInsertOne.ok){
          setLoader(false);
          setFromData({});
          setMessageDetails('success', 'Successfully insert the data', setMessage, setMessageData);
        }else{
          setLoader(false);
          setMessageDetails('error', 'failed to insert the data', setMessage, setMessageData);
        }
      }else {
        setLoader(false);
        setMessageDetails('error', 'Failed to upload the image', setMessage, setMessageData);
      }
    }catch(error) {
      console.log(error);
      setLoader(false);
      setMessageDetails('error', 'failed to insert the data', setMessage, setMessageData);
    }
    
  }

  function handleImage(e) {
    console.log(e.target.files[0])
    setImageFile(e.target.files[0])
    setImageFilename(e.target.files[0].name)
  }

   // push notifiation using expo server
  async function sendPushNotificationHandler() {
    try{
      const res = await fetch('/api/notifyApp', {
        method: 'post',
        body: JSON.stringify({'title': notifyTitle, 'text': notifyText })
      } )

      if(res){
        setNotifyTitle('');
        setNotifyText('');
        console.log('Notified')
      }
    }catch(error){
      console.log(error);
    }

  }

  if(loader){
    return <Loader />
  }

  return (
    <>
      <CentreTitle />
      <div className={classes.shadow}>
        <div className={classes.container}>
          <UploadHeader uploadType={'single'}/>
        </div>
      </div>

      <div className={classes.container}>

        <div className={classes.fetchApi}>
          <Link href={ '/fetch-source-api' }>
            <Button text={ 'Fetch World API'} />
          </Link>

          {triggerNotify ?
            <div className={classes.notify+' '+classes.notify_container}>
              <Button text={ 'notifyclose'}  onClick={() => setTriggerNotify(false)} />
              <input className={classes.input} type='text' placeholder='Title of Notification'  
                value={notifyTitle} onChange={(e) => setNotifyTitle(e.target.value)}
              />
              <input className={classes.input} type='text' placeholder='Enter text to Notify'  
                value={notifyText} onChange={(e) => setNotifyText(e.target.value)}
              />
              <Button text={ 'Send Notification'} onClick={sendPushNotificationHandler} />
            </div>
            :
            <div className={classes.notify}>
              <Button text={ `notifyopen`}  onClick={() => setTriggerNotify(true)} />           
            </div> 
          }
        </div>

        <form action={handleSubmit} className={classes.form}>
            <Input label={'title'} placeholder={'Enter Title'} type={'text'} formData={formData} setFromData={setFromData}/>
            <Select label={'category'} categories={categories} formData={formData} setFromData={setFromData} />
            <TextArea label={'description'} placeholder={'Enter Description'} formData={formData} setFromData={setFromData} />
            <Input label={'source'} placeholder={'Enter Source'} type={'text'} formData={formData} setFromData={setFromData}/>
            <Input label={'source_link'} placeholder={'Enter Source Url'} type={'text'} formData={formData} setFromData={setFromData}/>

            <div className={classes.image_container}>
              <input className={classes.image} placeholder={'Upload Image'} type={'file'} 
                accept="image/png, image/gif, image/jpeg"  required
                onChange={handleImage}
              />
            </div>

            <div className={classes.submit}>
              <Button text={'submit'} />  
            </div>
        </form>

        {/* <button onClick={() => { setFromData({}); console.log('formData'); console.log(formData) } }> click </button> */}

        { message && <Message type={messageData.type} message={messageData.message} onClose={() => setMessage(false)}/>}
        
      </div>
    </>
  )
}
