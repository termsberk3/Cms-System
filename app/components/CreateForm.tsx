
"use client";

import React, { FC, useState, FormEvent, useEffect } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Container, MenuItem, Select } from '@mui/material';
import { Button } from '@mui/material';
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import axios from "axios";


const CreateForm = () => {
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [user, setUser] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [userData, setUserData] = useState([])
    const [password, setPassword] = useState<string>("");

    const router = useRouter();
    const pathname = usePathname()
    const pageType = pathname.startsWith('/users/create') ? 'users' : 'customers';

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!fullName || !email) {
            alert("Please Enter Name and Email");
            return;
        }

        if (pathname === "/users/create") {
            try {
                const res = await fetch("http://localhost:3000/api/user", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ fullName, email, password, userType: "User" }),
                });

                if (res.ok) {
                    router.push('/users')
                    router.refresh();
                } else {
                    throw new Error("Failed to create User");
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const res = await fetch("http://localhost:3000/api/customer", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ fullName, email, user, userName }),
                });

                if (res.ok) {
                    router.push('/customers')
                    router.refresh();
                } else {
                    throw new Error("Failed to create User");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('/api/user')
            setUserData(data.admins)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <Container maxWidth="md" sx={{ marginTop: 10, padding: 3 }}>
            <form onSubmit={handleSubmit}>
                {pageType === "users" ? <FormGroup >
                    <FormControl sx={{ padding: 1 }}>
                        <TextField
                            id="outlined-full-name"
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullName}
                        />
                    </FormControl>
                    <FormControl sx={{ padding: 1 }}>
                        <TextField
                            id="outlined-email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </FormControl>
                    <FormControl sx={{ padding: 1 }}>
                        <TextField
                            id="outlined-email"
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </FormControl>
                    <FormControl sx={{ padding: 1 }}>
                        <Button className="bg-green-600 font-bold text-white py-3 px-6 w-fit" type="submit" >+ Create</Button>
                    </FormControl>
                </FormGroup> : <FormGroup >
                    <FormControl sx={{ padding: 1 }}>
                        <TextField
                            id="outlined-full-name"
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullName}
                        />
                    </FormControl>
                    <FormControl sx={{ padding: 1 }}>
                        <TextField
                            id="outlined-email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </FormControl>
                    <FormControl sx={{ padding: 1 }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={user}
                            label="Id"
                            onChange={(e) => setUser(e.target.value)}
                        >
                            {userData.map(i => (
                                <MenuItem key={(i as any)._id} value={(i as any)._id}>{(i as any)._id} {(i as any).fullName}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <FormControl sx={{ padding: 1 }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={userName}
                            label="User"
                            onChange={(e) => setUserName(e.target.value)}
                        >
                            {userData.map(i => (
                                <MenuItem key={(i as any)._id} value={(i as any).fullName}>{(i as any).fullName}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <FormControl sx={{ padding: 1 }}>
                        <Button type='submit' sx={{ width: 100 }}>+ Create</Button>
                    </FormControl>
                </FormGroup>
                }
            </form>
        </Container>
    );
}

export default CreateForm;