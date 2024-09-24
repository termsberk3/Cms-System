"use client"
import React from 'react'
import { AuthProvider } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import DataTable from '../components/Tables'
import Buttons from '../components/Buttons'

const Customers = () => {
  const router = useRouter()
  console.log(router)
  return (
    <AuthProvider>
      <Buttons/>
      <DataTable />
    </AuthProvider>
  )
}

export default Customers