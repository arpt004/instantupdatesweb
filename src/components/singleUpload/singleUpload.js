'use client'

import { useState } from 'react';
import Button from '../ui/button';
import Input from '../ui/input';
import Select from '../ui/select';
import TextArea from '../ui/textarea';
import UploadHeader from '../ui/uploadHeader/uploadHeader';
import classes from './singleUpload.module.css';
import { categories } from '@/data/allCategories';


export default function SingleUpload() {

  const [formData, setFromData] = useState({})
  const [imageFile, setImageFile] = useState();
  const [imageFilename, setImageFilename] = useState('');

  async function handleSubmit() {
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
        setFromData({})
      }
    }catch(error) {
      console.log(error)
    }
    
  }

  function handleImage(e) {
    console.log(e.target.files[0])
    setImageFile(e.target.files[0])
    setImageFilename(e.target.files[0].name)
  }


  return (
    <div className={classes.container}>
      <UploadHeader uploadType={'single'}/>

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

      <button onClick={() => { setFromData({}); console.log('formData'); console.log(formData) } }> click </button>
    </div>
  )
}
