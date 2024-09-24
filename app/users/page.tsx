import React from 'react'
import DataTable from '../components/Tables'
import { AuthProvider } from '../contexts/AuthContext'
import Buttons from '../components/Buttons'

const User = () => {
  return (
      <AuthProvider>
        <Buttons/>
        <DataTable />
      </AuthProvider>
  )
}

export default User