"use client"
import React from 'react'
import { AuthProvider } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import DataTable from '../components/Tables'

const Customers = () => {
  const router = useRouter()
  console.log(router)
  return (
    <AuthProvider>
      <DataTable />
    </AuthProvider>
  )
}

export default Customers