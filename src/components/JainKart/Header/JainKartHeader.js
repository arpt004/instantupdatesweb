"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button } from "@fluentui/react-components";
import classes from "./JainKartHeader.module.css";

import { adminJainsKart } from '../../../redux/actions/adminJainsKart';

const JainKartHeader = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.adminJainsKart);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 700);
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
    </div>
  );
};

export default JainKartHeader;
