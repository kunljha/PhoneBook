import React from 'react'
import PropTypes from 'prop-types'

const ContactItem = ({ contact }) => {
  return (
    <div>
      <h3>{contact.name}</h3>
    </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
}

export default ContactItem