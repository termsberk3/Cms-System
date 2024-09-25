"use client"
import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePathname, useRouter } from "next/navigation";
import { Button, Link, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface ButtonProps {
    createType?: string | null;
    tableType?: string | null;
    children?: any;
    variant?: any;
    type?: any;
    sx?: any;
}

const Buttons: FC<ButtonProps> = ({ tableType, createType, children }) => {
    const { isAuthenticated, logout, userType } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    tableType = pathname.includes('/create') ? 'no-show' : 'dataTable';
    createType = pathname.includes('/create') ? 'create' : 'non-create';
   

    return (
        <>
            {tableType === "dataTable" ?
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: "10vh",
                    }}
                >
                    <Grid container spacing={2} width={1000}>
                        <Grid size={8} textAlign="left" >
                            <Typography variant="h4" component="h2">
                                {pathname.charAt(1).toUpperCase() + pathname.slice(2)}
                            </Typography>
                        </Grid>
                        <Grid size={4} textAlign="right" >
                            <Button variant="outlined"> <Link href={`${pathname}/create`} >Create {pathname.charAt(1).toUpperCase() + pathname.slice(2)}</Link></Button>
                        </Grid>
                    </Grid>
                </div> : <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}
                >
                </div>
            }
            {createType === "create" ?
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Grid container spacing={2} width={1000}>
                        <Grid size={12} textAlign="left" >
                            <Button type="submit" variant="outlined"> Create</Button>
                        </Grid>
                    </Grid>
                </div> : <div></div>
            }
        </>
    )
}

export default Buttons