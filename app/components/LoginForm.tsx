
"use client";

import React, { FC, useState, FormEvent } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import { Button } from '@mui/material';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

const LoginForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { storeUser } = useAuth();

    const router = useRouter();


    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please Enter Your Credentials");
            return;
        }

        try {
            const { data: { token, userType, id } } = await axios.post("/api/auth/login", {
                email, password
            },
            );
            console.log(userType)
            storeUser(token, userType, id)
            router.push('/')
            router.refresh();
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
                    <FormControl sx={{ padding: 1, width: 100 }}>
                        <Button className="bg-green-600 font-bold text-white py-3 px-6 w-fit" type="submit" >Login</Button>
                    </FormControl>
                </FormGroup>
            </form>
        </Container>
    );
}

export default LoginForm;