import React from 'react'
import Layout from '../../components/Layout/Layout'
import AssignRole from '../../components/AssignRoleComp/AssignRole'

function AssignRolePage() {
  return (
    <Layout>    
    <div className="flex pt-20 flex-col min-h-screen">
    <AssignRole/>
  </div>
  </Layout>
  )
}

export default AssignRolePage
