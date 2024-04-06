'use client'

import { useEffect, useState } from "react";

export function valdiateUser() {
    const getAuthData = sessionStorage.getItem('auth')
    const salt = '1413914!@#**756404$808&1412914_music_'

    console.log(getAuthData === salt)
    if(getAuthData === salt) 
        return true;
    
    return false;
}

export default function AuthGuard({children}) {

    const [authenticate, setAuthenticate] = useState(false);

    useEffect( () => {
        const checkUser = valdiateUser();
        if(checkUser){
            setAuthenticate(true)
        }else{
            setAuthenticate(false)
        }
    })

    if(!authenticate){
        return <h2> You are not Authorized!! </h2>
    }

  return (
    <div>{children}</div>
  )
}