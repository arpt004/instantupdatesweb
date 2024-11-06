"use client";

import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import AdminForm from "./AdminForm/AdminForm";

const Admin = () => {
  const authToken = useSelector((state) => state.adminJainsKart);
  const router = useRouter();

  useEffect(() => {
    const authValue = sessionStorage.getItem('authJainsKart');
    const salt = process.env.NEXT_PUBLIC_SALT;

    if( !authToken || salt !== authValue ) {
        router.push('/jains-kart')
    }    
  }, [])

  return (
    <>
        {authToken ? 
            <div>
                <AdminForm />
            </div>
        :    
            <h2> Not Authorized!! </h2>
        }
    </>
  )
}

export default Admin