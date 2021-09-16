import ReactDOM from 'react-dom'

import classes from './Modal.module.css'

const Modal = (props) => {
  return (
    ReactDOM.createPortal(
      <div className={classes.modal}>
        {props.children}
      </div>,
      document.getElementById('modal')
    )
  )
}

export default Modal