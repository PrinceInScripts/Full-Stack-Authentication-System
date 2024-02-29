import React from 'react'
import ContactForm from '../../components/ContactForm/ContactForm'
import Layout from '../../components/Layout/Layout'

function Contact() {
  return (
    <Layout>
    <div className="flex pt-20 flex-col min-h-screen">
      <ContactForm/>
    </div>
    </Layout>
  )
}

export default Contact
