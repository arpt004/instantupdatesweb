import React from 'react'
import Link from 'next/link'
import classes from './associate.module.css'

const affiliateData = [
    {
        brand: 'Amazon',
        affiliateLink: 'https://amzn.to/4gTTMNd',
        source: 'Amazon Associates'
    },
    {
        brand: 'Flipkart',
        affiliateLink: 'https://fktr.in/epXTio5',
        source: 'EarnKaro'
    },
    {
        brand: 'Myntra',
        affiliateLink: 'https://myntr.it/TcyTxG5',
        source: 'EarnKaro'
    },
    {
        brand: 'AJIO',
        affiliateLink: 'https://ajiio.in/9oI6l6G',
        source: 'EarnKaro'
    },
    {
        brand: 'XYXX',
        affiliateLink: 'https://bitli.in/GpGLbYt',
        source: 'EarnKaro'
    },
    // {
    //     brand: 'NYKAA',
    //     affiliateLink: 'https://bitli.in/fi97yZ1',
    //     source: 'EarnKaro'
    // },
]

const Associate = () => {
  return (
    <div className={classes.associateContainer}>
        { affiliateData.map(eachData => {
            return(
                <Link href={eachData.affiliateLink} className={classes.associateLink}> 
                    <div className={classes.associateLinkDiv}>
                        <h2> {eachData.brand} </h2>
                        <button> Buy From {eachData.brand} </button>
                    </div>
                </Link>
            )
        })
        }
    </div>
  )
}

export default Associate