import classes from './ui.module.css';

export default function AdminSelect({label, categories, formData, handleChange }) {

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
            return(
              <option value={category} key={category}> {category.toUpperCase()} </option>
            )
          })
        }
      </select>
    </div>
  )
}
