'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/input';
import classes from './loginForm.module.css';
import Button from '@/components/ui/button';

export default function LoginForm() {

    const [formData, setFromData] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);

    const router = useRouter();
    
    async function handleFormSubmit() {
        setErrorMsg(null);

        console.log(process.env)
        const username  = 'admin@instantupdates.in';
        const password  = 'admin123';
        const salt = '1413914!@#**756404$808&1412914_music_';

        if(formData.email === username){
            if(formData.password === password){
                await sessionStorage.setItem('auth', salt)
                router.push('/')
            }else {
                await sessionStorage.removeItem('auth')
                setErrorMsg('Incorrect password')
            }
        }else {
            await sessionStorage.removeItem('auth')
            setErrorMsg('Invalid Username')
        }     
    }

  return (
    <div className={classes.form_container}>
        {errorMsg && <p className={classes.error}> {errorMsg }</p>}

        <form className={classes.form} action={handleFormSubmit}>
            <Input label={'email'} placeholder={'Enter email'} type={'email'} 
                formData={formData} setFromData={setFromData}/>
            <Input label={'password'} placeholder={'Enter password'} type={'password'} 
                formData={formData} setFromData={setFromData}/>
            <Button text={'Submit'}  />
        </form>
    </div>
  )
}
