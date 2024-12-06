'use client'

import React, { useState } from 'react'
import classes from './LeftSideBar.module.css'
import Link from 'next/link'
import { Button } from '@fluentui/react-components'
import { ChevronDown12Filled, ChevronUp12Filled } from '@fluentui/react-icons'

const LeftSideBar = ({categories, filterSection}) => {

  const [ filterOpen, setFilterOpen ] = useState(false)

  return (
    <div className={classes.leftSideBarContainer}>
      <Link href={`/jains-kart`} className={classes.categoriesTitle}>
        <h2> Categories </h2>
      </Link>
      <hr className={classes.horizontalLine}/>
      <div className={classes.categoriesContainer}>
        {categories.map((category)=> {
          return(
            <Link href={`/jains-kart/category/${category.toLowerCase().replaceAll(' ','-')}`}
              className={classes.categoriesLink} key={category}
            > 
              <h3> { category } </h3>
            </Link>
          )
        })}
      </div>

      {filterSection && 
        <div className={classes.filterSection}>
          <Button className={classes.filterButton} onClick={() => setFilterOpen(pv => !pv)} >
            <div className={classes.filterTitle} > 
              <div className={classes.filterText} > <span> Filters </span> </div>
              <div className={classes.filterIcon} > { filterOpen ? <ChevronUp12Filled /> : <ChevronDown12Filled /> } </div>
            </div>
          </Button>
        </div>
      }

      {filterOpen && 
        <>
          <hr className={classes.horizontalLine}/>
          <ol className={''}>
            <li> Brand </li>
            <li> Price </li>
            <li> Category </li>
          </ol>
        </>
      }
    </div>
  )
}

export default LeftSideBar