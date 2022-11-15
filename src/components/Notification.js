import React from 'react'
import Alert from 'react-bootstrap/Alert'

const Notification = ({ message }) => {
  if (message !== null) {
    return (
      <Alert>
        {message}
      </Alert>
    )
  }
  else {
    return null
  }
}

export default Notification