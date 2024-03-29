import classes from './ui.module.css'

export default function Button({text, onClick}) {
  return (
    <div className={classes.button_container}>
      <button className={classes.button} onClick={onClick}> {text.toUpperCase()} </button>
    </div>
  )
}
