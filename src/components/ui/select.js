import classes from './ui.module.css';

export default function Select({label, categories, formData, setFromData}) {

  function handleChange(e) {
    setFromData(pd => {
      pd[e.target.name] = e.target.value
      return pd;
    })
  }

  return (
    <div className={classes.input_container}>
      <label className={classes.label}> {label.toUpperCase()} 
        {true && <p className={classes.star}>*</p> }
      </label>
      <select className={classes.input} required 
        onChange={handleChange} value={formData.label} name={label}
      >
        <option value=''> Select </option>
        { categories.map(category => {
            if(category === 'mix') return;
            return(
              <option value={category} key={category}> {category.toUpperCase()} </option>
            )
          })
        }
      </select>
    </div>
  )
}
