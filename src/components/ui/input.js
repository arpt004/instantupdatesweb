import classes from './ui.module.css'

export default function Input({label, placeholder, type, formData, setFromData}) {

  function handleChange(e) {
    setFromData(pd => {
      pd[e.target.name] = e.target.value
      return pd;
    })
  }

  return (
    <div className={classes.input_container}>
      <label className={classes.label}> {label.replaceAll('_',' ').toUpperCase()} 
        {true && <p className={classes.star}>*</p> }
      </label>
      {true ?
        <input className={classes.input} type={type} placeholder={placeholder} required
          onChange={handleChange} value={formData.label} name={label}
        />
        :
        <input className={classes.input} type={type} placeholder={placeholder} 
          onChange={handleChange} value={formData.label} name={label}
        />
      }
    </div>
  )
}
