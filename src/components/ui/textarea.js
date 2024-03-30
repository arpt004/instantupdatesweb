import classes from './ui.module.css'

export default function TextArea({label, placeholder, formData, setFromData}) {

  function handleChange(e) {
    setFromData(pd => {
      pd[e.target.name] = e.target.value
      return pd;
    })
  }
  
  return (
    <div className={classes.input_container }>
      <label className={classes.label}> {label.toUpperCase()} 
        {true && <p className={classes.star}>*</p> }
      </label>
      <textarea className={classes.input +" "+ classes.textarea} placeholder={placeholder} required 
        onChange={handleChange} value={formData.label} name={label}
      />
    </div>
  )
}
