import ReactDOM from 'react-dom'

import classes from './Backdrop.module.css'

const Backdrop = (props) => {
  console.log('backdrop is called')
  return (
    ReactDOM.createPortal(
      <div className={classes.backdrop} onClick={props.onClick} />,
      document.getElementById('backdrop')
    )
  )
}

export default Backdrop