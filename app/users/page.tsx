import React from 'react'
import DataTable from '../components/Tables'
import { AuthProvider } from '../contexts/AuthContext'

const User = () => {
  return (
      <AuthProvider>
        <DataTable />
      </AuthProvider>
  )
}

export default User