import classes from './ui.module.css'

export default function Button({text, onClick}) {
  return (
    <div className={classes.button_container}>
      { text === 'notifyopen' ?
        <button className={classes.button} onClick={onClick}> NOTIFY &nbsp;
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -4 24 24" strokeWidth={1.5} 
            stroke="currentColor" width='15' height='15'>
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
          </svg>
        </button>
        : text === 'notifyclose' ?          
        <button className={classes.button} onClick={onClick}> CLOSE &nbsp;
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -4 24 24" strokeWidth={1.5} 
            stroke="currentColor" width='15' height='15'>
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
          </svg>
        </button>      
        :
        <button className={classes.button} onClick={onClick}> {text.toUpperCase()} </button> 
      }
    </div>
  )
}
