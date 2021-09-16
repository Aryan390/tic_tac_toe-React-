import classes from './Button.module.css'

const Button = (props) => {
  return (
    <button onClick={props.clickHandler} className={classes.btn}>{props.children}</button>
  )
}

export default Button;