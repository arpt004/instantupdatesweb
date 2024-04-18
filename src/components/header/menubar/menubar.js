'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import classes from './menubar.module.css';
import Button from '@/components/ui/button';
import CentreTitle from './CentreTitle';
import { valdiateUser } from '@/components/Auth/authGuard';

export default function Menubar({ setNews, allNews }) {

    const [searchIcon, setSearchIcon] = useState(true);
    const [authenticate, setAuthenticate] = useState(false);

    useEffect(() => {
        const checkUser = valdiateUser();
        if(checkUser){
            setAuthenticate(true)
        }else{
            setAuthenticate(false)
        }
    })

    function handleLogout() {
        console.log('clicked');
        sessionStorage.clear();
        setAuthenticate(false);
    }

    function handleSearch(e) {
        console.log(e.target.value);
        setNews( () => {
            const filterData = allNews.filter((eachNews) => eachNews.title.toLowerCase().includes(e.target.value));
            console.log(filterData)
            return filterData;
        })
    }

    return(
        <div className={classes.shadow}>
            <div className={classes.container}> 
                <div className={classes.search} >
                  { searchIcon ?
                    <div className={classes.search_box} >
                        <button className={classes.search_btn} onClick={() => setSearchIcon(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                                stroke="currentColor" className="w-6 h-6" height="20" width="20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </button>
                    </div>
                    :
                    <div className={classes.search_box} >
                        <input className={classes.input} type='text' placeholder='Search' 
                            onChange={handleSearch}
                        />
                    </div>
                  }
                </div>



                <div className={classes.header}>
                    <CentreTitle />
                </div>

                <div className={classes.link}>
                    {authenticate ?
                        <div className={classes.admin_control}>
                            <Link href='/admin-control/single-upload'> <Button text={'Admin Control'}/>  </Link> 
                            &nbsp;
                            <Link href='/'> <Button text={'Logout'} onClick={handleLogout} /> </Link> 
                        </div>
                        :
                        <Link href='/login'> <Button text={'Login'}/>  </Link> 
                    }
                </div>
            </div>
        </div>
    )
}