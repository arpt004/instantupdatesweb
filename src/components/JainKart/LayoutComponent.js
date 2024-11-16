"use client"

import React from 'react'
import { Provider } from 'react-redux';
import store from '../../redux/store';
import JainKartFooter from "@/components/JainKart/Footer/JainKartFooter";
import JainKartHeader from "@/components/JainKart/Header/JainKartHeader";

const LayoutComponent = ({children}) => {
  return (
    <>
        <Provider store={store}>  
            <JainKartHeader />
            <> {children} </>
            <JainKartFooter />
        </Provider>
    </>
  )
}

export default LayoutComponent