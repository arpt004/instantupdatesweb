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

        const username  = process.env.NEXT_PUBLIC_USERNAME;
        const password  = process.env.NEXT_PUBLIC_PASSWORD;
        const salt = process.env.NEXT_PUBLIC_SALT;

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
