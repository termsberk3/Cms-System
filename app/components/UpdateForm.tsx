"use client"
import React, { FC, useState, FormEvent, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import { Button } from '@mui/material';
import { usePathname, useRouter } from "next/navigation";
import axios from 'axios';
import Alert from '@mui/material/Alert';


interface EditFormProps {
    id: string;
    email: string;
    user?: string;
    customer?: string;
}

const UpdateForm: FC<EditFormProps> = ({ id, email }) => {
    const [newEmail, setNewEmail] = useState<string>(email);
    const router = useRouter();
    const pathname = usePathname()

    if (pathname.startsWith('/users')){
    const fetchUser = async (): Promise<void> => {
        try {
            const { data } = await axios.get(`/api/user/${id}`);

        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    useEffect(() => {


        fetchUser();
    }, [id]);
}else{
    const fetchUser = async (): Promise<void> => {
        try {
            const { data } = await axios.get(`/api/customer/${id}`);

        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    useEffect(() => {


        fetchUser();
    }, [id]);

}
    

    const handleSubmit = async (id: string, updatedUserData: { email: string}, e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        if (pathname.startsWith('/users')){
            try {
                const response = await axios.patch(`/api/user/${pathname.split("/")[3]}`, updatedUserData, {
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any necessary authorization headers here
                    },
    
                });
                alert("User Updated")
                router.push('/users')
                router.refresh();
            } catch (error) {
                console.error('Error updating User:', error);
                throw error;
            }
        }else{
            try {
                const response = await axios.patch(`/api/customer/${pathname.split("/")[3]}`, updatedUserData, {
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any necessary authorization headers here
                    },
    
                });
                alert("Customer Updated")
                router.push('/customers')
                router.refresh();
            } catch (error) {
                console.error('Error updating Customer:', error);
                throw error;
            }
        }
    };
    
    return (
        <>
            <Container maxWidth="md" sx={{ marginTop: 10, padding: 3 }}>
                <form onSubmit={(e) => handleSubmit(id, { email: newEmail}, e)}>
                    <FormGroup>
                        <FormControl sx={{ padding: 1 }}>
                            <TextField
                                id="outlined-email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl sx={{ padding: 1 }}>
                            <Button variant="outlined" type='submit' sx={{width : 100}}>Update</Button>
                        </FormControl>
                    </FormGroup>
                </form>
            </Container>
        </>
    );
}

export default UpdateForm;