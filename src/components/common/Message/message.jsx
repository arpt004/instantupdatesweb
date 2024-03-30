import classes from './message.module.css'

export default function Message({type='success', message='Great! it went success', onClose}) {

  let conainerColor = 'green'

  switch (type) {
    case 'error':
      conainerColor = 'red'
      break;

    case 'info':
      conainerColor = 'blue'
      break;
  
    default:
      conainerColor = 'green'
      break;
  }  

  return (
    <div className={classes.container} style={{ background: conainerColor}}>
      <h2> 
        {message}  
        <button className={classes.close} onClick={onClose}> &times; </button>
      </h2>
    </div>
  )
}
