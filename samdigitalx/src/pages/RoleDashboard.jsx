import React from 'react'
import { getUserRole } from '@/utils/auth'
import { Navigate } from "react-router-dom"
import AdminPanel from './admindashboard/AdminPanel'

export default function RoleDashboard() {
    const userRole = getUserRole();
    if(!userRole){
        return <Navigate to='/login' replace/>
    } 

    switch(userRole){
        case 'admin':
            return <AdminPanel/>;        
        default:
            return <Navigate to='/login' replace/>
    }
}
