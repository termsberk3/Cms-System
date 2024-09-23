'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from
    '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';


function Header() {
    const { isAuthenticated, logout, userType } = useAuth()
    const router = useRouter()
    const handleLogout = () => {
        logout();
        router.push('/login');
    }
    console.log(userType)
    return (
        <>
            {!isAuthenticated ? (
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            <Link href="/" >CMS</Link>
                        </Typography>
                        <Link href={"/login"} color="inherit" style={{ marginLeft: 'auto' }}>
                            Login
                        </Link>
                    </Toolbar>
                </AppBar>
            ) : (<AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div">
                        <Link href="/" >CMS</Link>
                    </Typography>
                   { userType !== "User" ?  <Typography variant="h6" component="div" style={{ marginLeft: 30 }}>
                        <Link href="/users" >
                            Users
                        </Link>
                    </Typography> : " "}
                    { userType !== "Customer" ?  <Typography variant="h6" component="div" style={{ marginLeft: 30 }}>
                        <Link href="/customers" >
                            Customers
                        </Link>
                    </Typography> : " "}
                    <Button color="inherit" sx={{ marginLeft: 'auto' }} onClick={() => handleLogout()}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>)}
        </>
    );
}

export default Header;