import React from 'react'
import DashboardOverview from '../../components/DashboardOverview/DashboardOverview'
import Layout from '../../components/Layout/Layout'

function Dashboard() {
  return (
    <Layout>    
      <div className="flex pt-20 flex-col min-h-screen">
      <DashboardOverview/>
    </div>
    </Layout>

  )
}

export default Dashboard
