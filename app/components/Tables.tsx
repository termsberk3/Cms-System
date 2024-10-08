"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RemoveButton from './RemoveButton';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from './LoginForm';
import Customers from '../customers/page';
import { usePathname, useRouter } from "next/navigation";
import Buttons from './Buttons';

export interface DataTable {
    id: string;
}


const DataTable = ({ }) => {
    const { isAuthenticated, userType, userId } = useAuth()
    const [data, setData] = useState<DataTable[]>([]);
    const [isChanged, setIsChanged] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const router = useRouter();
    const pathname = usePathname()
    const pageType = pathname.startsWith('/users') ? 'users' : 'customers';
    if (pathname === "/users") {
        const fetchData = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/api/user");
                setData(data.admins);
                router.refresh();
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        };
        useEffect(() => {
            fetchData()
        }, [isChanged]);
    } else {
        const fetchData = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/api/customer");
                setData(data.customers);
                router.refresh();
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        };
        useEffect(() => {
            fetchData()
        }, [isChanged]);
    }

    const columns = pathname === "/users" && userType !== "User"
        ? [
            { field: 'fullName', headerName: 'Name', width: 200 },
            { field: 'email', headerName: 'E mail', width: 300 },
            { field: 'userType', headerName: 'Type', width: 300 },
            {
                field: 'edit',
                headerName: 'Edit',
                width: 100,
                hideable: false,
                sortable: false,
                editable: false,
                filterable: false,
                disableColumnMenu: true,
                renderCell: (DataTable: any) => {
                    if (userType === "Customer") {
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            </div>
                        );
                    }
                    return (
                        <Typography variant="h4" component="h2" style={{
                            display: 'flex',
                            margin: "auto",
                            padding: 3
                        }}>
                            <Link href={`/${pageType}/update/${DataTable.id}`}><EditIcon /></Link>
                        </Typography>
                    );
                },
            },
            {
                field: 'Delete',
                headerName: 'DELETE',
                width: 100,
                hideable: false,
                sortable: false,
                editable: false,
                filterable: false,
                disableColumnMenu: true,
                renderCell: (DataTable: any) => {
                    if (userType === "Customer") {
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            </div>
                        );
                    }
                    return (
                        <Typography variant="h4" component="h2" style={{
                            display: 'flex',
                            margin: "auto",
                            padding: 3
                        }}>
                            <RemoveButton id={DataTable.id} setIsChanged={setIsChanged}></RemoveButton>
                        </Typography>
                    );
                },
            },
        ]
        : [
            { field: 'fullName', headerName: 'Name', width: 200 },
            { field: 'email', headerName: 'E mail', width: 300 },
            { field: 'userName', headerName: 'User', width: 300 },
            {
                field: 'edit',
                headerName: 'Edit',
                width: 100,
                hideable: false,
                sortable: false,
                editable: false,
                filterable: false,
                disableColumnMenu: true,
                renderCell: (DataTable: any) => {
                    if (userType == 'Customer' || (userType == 'User' && DataTable.row.user !== userId)) {
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            </div>
                        );
                    }
                    return (
                        <Typography variant="h4" component="h2" style={{
                            display: 'flex',
                            margin: "auto",
                            padding: 3
                        }}>
                            <Link href={`/${pageType}/update/${DataTable.id}`}><EditIcon /></Link>
                        </Typography>
                    );
                },
            },
            {
                field: 'Delete',
                headerName: 'DELETE',
                width: 100,
                hideable: false,
                sortable: false,
                editable: false,
                filterable: false,
                disableColumnMenu: true,
                renderCell: (DataTable: any) => {
                    if (userType == 'Customer' || (userType == 'User' && DataTable.row.user !== userId)) {
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            </div>
                        );
                    }
                    return (
                        <Typography variant="h4" component="h2" style={{
                            display: 'flex',
                            margin: "auto",
                            padding: 3
                        }}>
                            <RemoveButton id={DataTable.id} setIsChanged={setIsChanged}></RemoveButton>
                        </Typography>
                    );
                },
            },
        ];
    return (
        <>
            {!isAuthenticated ? (
                <LoginForm />
            ) : (<div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ backgroundColor: 'white', padding: 2 }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        getRowId={(row: any) => row._id}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5, 10, 15]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>)}

        </>
    );
};
export default DataTable;   