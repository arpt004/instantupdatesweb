"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogBody, DialogSurface } from "@fluentui/react-components";
import classes from "./JainKartHeader.module.css";

import { adminJainsKart } from '../../../redux/actions/adminJainsKart';
import { Dismiss24Filled } from "@fluentui/react-icons";
import CartModalCard from "./CartModalCard/CartModalCard";

const JainKartHeader = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.adminJainsKart);
  const cartReduxCount = useSelector((state) => state.cartCount);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartModal, setCartModal] = useState(false);

  const handleResize = () => {
    // console.log("window.innerWidth:", window.innerWidth);
    setIsMobile(window.innerWidth < 733);
  };

  useEffect(() => {
    const authValue = sessionStorage.getItem('authJainsKart');
    const salt = process.env.NEXT_PUBLIC_SALT;
    if(salt === authValue) dispatch(adminJainsKart(true));
    else dispatch(adminJainsKart(false));
  }, []);
  

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = () => {
    router.push('/jains-kart/login')
  }

  const handleLogout = () => {
    sessionStorage.removeItem('authJainsKart')
    dispatch(adminJainsKart(false))
    router.push('/jains-kart')
  }

  const handleCartClick = () => {
    console.log('handleCartClick')
    console.log('cartCount')
    console.log(cartReduxCount)
    setCartModal(pv => !pv)
  }

  const handleCloseCart = () => {
    setCartModal(false)
  }

  return (
    <div className={classes.headerContianer}>
      <header className={classes.header}>
        <div className={classes.logo}>
          <Link href={`/jains-kart`} className={classes.categoriesTitle}>
            <Image
              src={"/images/Jainskart/jainskart.png"}
              alt="Jain's Kart"
              width={"200"}
              height={"40"}
            />
          </Link>
        </div>
        <nav className={isMobile ? classes.mobile_nav : classes.desktop_nav}>
          <ul className={isMenuOpen ? classes.nav_open : ''}>
            <li> <Link href={`/jains-kart`} className={classes.navLink} > Home </Link> </li>
            <li> <Link href={`/jains-kart/about`} className={classes.navLink} > About </Link> </li>
            <li> <Link href={`/jains-kart/contact`} className={classes.navLink} > Contact </Link> </li>
            <Button onClick={handleCartClick} disabled={cartReduxCount<1? true:false}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 50 50">
                <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="#344054" strokeWidth={3} d="M35.417 42.708h.208m-12.708 0h.208z"></path>
                  <path stroke="#306cfe" strokeWidth={2} d="M6.25 6.25h4.833a2.08 2.08 0 0 1 1.938 1.313l7.812 19.52l-2.666 5.313a2.084 2.084 0 0 0 1.875 3.02h19.541"></path>
                  <path stroke="#306cfe" strokeWidth={2} d="M15 12.5h28.75l-5.833 14.583H20.833"></path>
                </g>
              </svg>
              {cartReduxCount>=1 && <span> { cartReduxCount } </span> }
            </Button>
            { authToken && <li> <Link href={`/jains-kart/admin`} className={classes.navLink} > Admin </Link> </li> }
            <li> 
              { authToken ?
                <Button onClick={handleLogout} className={classes.loginButton} > Logout </Button>
                :
                <Button onClick={handleLogin} className={classes.loginButton} > Login </Button>
              }
            </li>
          </ul>

          {isMobile && (
            <div
              className={classes.hamburger}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Button onClick={handleCartClick} disabled={cartReduxCount<1? true:false}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 50 50">
                  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="#344054" strokeWidth={3} d="M35.417 42.708h.208m-12.708 0h.208z"></path>
                    <path stroke="#306cfe" strokeWidth={2} d="M6.25 6.25h4.833a2.08 2.08 0 0 1 1.938 1.313l7.812 19.52l-2.666 5.313a2.084 2.084 0 0 0 1.875 3.02h19.541"></path>
                    <path stroke="#306cfe" strokeWidth={2} d="M15 12.5h28.75l-5.833 14.583H20.833"></path>
                  </g>
                </svg>
                {cartReduxCount>=1 && <span> { cartReduxCount } </span> }
              </Button>

              ☰
            </div>
          )}
        </nav>
      </header>

      { isMobile && isMenuOpen && (
        <div className={classes.nav_closed_container} onClick={() => setIsMenuOpen(false)}>
          <ul className={classes.nav_closed}>
            <li> <Link href={`/jains-kart`} className={classes.navLink} > Home </Link> </li>
            <li> <Link href={`/jains-kart/about`} className={classes.navLink} > About </Link> </li>
            <li> <Link href={`/jains-kart/contact`} className={classes.navLink} > Contact </Link> </li>
            { authToken && <li> <Link href={`/jains-kart/admin`} className={classes.navLink} > Admin </Link> </li> }
            <li> 
              { authToken ?
                <Button onClick={handleLogout} className={classes.loginButton} > Logout </Button>
                :
                <Button onClick={handleLogin} className={classes.loginButton} > Login </Button>
              }
            </li>
          </ul>
        </div>
      )}

      <Dialog open={cartModal} onOpenChange={handleCloseCart}>
        <DialogSurface className={classes.modalContainer}>
          <DialogBody className={classes.modalInnerContainer}>
            <Button className={classes.modalButton} onClick={handleCloseCart}>
              <Dismiss24Filled />
            </Button>
            <CartModalCard setCartModal={setCartModal} isMobile={isMobile}/>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

export default JainKartHeader;
