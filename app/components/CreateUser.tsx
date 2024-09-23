
"use client";

import React, { FC, useState, FormEvent } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Container, MenuItem, Select } from '@mui/material';
import { Button } from '@mui/material';
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';

export interface CreateProps {
    postType: string;
}

const CreateUser = ({ postType, ...props }: CreateProps) => {
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
const router = useRouter();
const pathname = usePathname()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!fullName || !email) {
            alert("Please Enter Name and Email");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/user", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ fullName, email , password, userType : "User"}),
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
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: 10, padding: 3 }}>
            <form onSubmit={handleSubmit}>
                <FormGroup >
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
                </FormGroup>
            </form>
        </Container>
    );
}

export default CreateUser;