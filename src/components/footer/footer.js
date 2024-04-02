import classes from './footer.module.css';

export default function Footer() {
    return(
        <div className={classes.container}> 
            <div className={classes.footer}>
                <p> <i> Copyright © 2024 Instant Updates, All rights reserved. </i> </p>
                <p> For reprint rights - Arpit Jain </p>
            </div>
        </div>
    )
}