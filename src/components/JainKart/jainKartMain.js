import JainKartBody from "./Body/JainKartBody"
import classes from "./jainKartMain.module.css"


export default function JainKartMain() {
    return(
        <div className={classes.container}> 
            <JainKartBody />
        </div>
    )
}