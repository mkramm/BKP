import React from 'react'

interface ContactBlockProps {
  email: string
  phone: string
}

const ContactBlock: React.FC<ContactBlockProps> = ({ email, phone }) => {
  return (
    <div className="contact">
      <p>E-Mail: {email}</p>
      <p>Telefon: {phone}</p>
    </div>
  )
}

export default ContactBlock