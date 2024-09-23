import React from 'react'
import DataTable from '../components/Tables'
import { AuthProvider } from '../contexts/AuthContext'
import {DataTableProvider} from '../contexts/DataTableContext'

const User = () => {
  return (
    <DataTableProvider>
      <AuthProvider>
        <DataTable />
      </AuthProvider>
    </DataTableProvider>
  )
}

export default User