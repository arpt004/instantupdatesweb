import classes from './ui.module.css'

export default function Input({label, placeholder, type, formData, setFromData, isRequired }) {

  function handleChange(e) {
    setFromData(pd => {
      pd[e.target.name] = e.target.value
      return pd;
    })
  }

  let star = isRequired
  if(isRequired === undefined){
    star = true
  }

  return (
    <div className={classes.input_container}>
      <label className={classes.label}> {label.replaceAll('_',' ').toUpperCase()} 
        {star && <p className={classes.star}>*</p> }
      </label>
      {star ?
        <input className={classes.input} type={type} placeholder={placeholder} required
          onChange={handleChange} defaultValue={formData[label]} name={label}
        />
        :
        <input className={classes.input} type={type} placeholder={placeholder} 
          onChange={handleChange} defaultValue={formData[label]} name={label}
        />
      }
    </div>
  )
}
