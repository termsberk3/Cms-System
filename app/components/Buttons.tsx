"use client"
import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePathname, useRouter } from "next/navigation";
import { Button, Link, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface ButtonProps {
    updateType?: string | null;
    createType?: string | null;
    children?: any;
    variant?: any;
    type?: any;
    sx?: any;
}

const Buttons: FC<ButtonProps> = ({ updateType, createType, children }) => {
    const { isAuthenticated, logout, userType } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    updateType = pathname.startsWith('/users') ? 'users' : 'customers';
    createType = pathname.includes('create') ? 'users' : 'customers';

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={10}>
                    <Typography variant="h4" component="h2" style={{
                        display: 'flex',
                        padding: 3
                    }}>
                        {updateType.charAt(0).toUpperCase() + updateType.slice(1)}
                    </Typography>
                </Grid>
                <Grid size={2}>
                    {updateType === "users" ?
                        <Button variant="outlined"> <Link href={"/users/create"} >Create {updateType.charAt(0).toUpperCase() + updateType.slice(1)}</Link></Button>
                        : <Button variant="outlined"> <Link href={"/customers/create"} >Create {updateType.charAt(0).toUpperCase() + updateType.slice(1)}</Link></Button>}
                </Grid>
            </Grid>
        </>
    )
}

export default Buttons