import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

const Notification = ({ message, title, status }) => {
  if (message !== null) {
    return (
      <ToastContainer position='top-end'>
        <Toast bg={status}>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    )
  }
}

export default Notification