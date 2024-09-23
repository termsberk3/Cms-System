"use client"
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';


interface AuthContextData {
    token: string;
    userType: string;
    isAuthenticated: boolean;
    storeUser: (token: string, userType: string, id: string) => void;
    logout: () => void;
    userId: string;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string>('');
    const [userType, setUserType] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const isAuthenticated = !!token;

    const storeUser = (token: string, userType: string, id: string) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userType', userType);
        localStorage.setItem('userId', id);
        setToken(token);
        setUserType(userType)
        setUserId(id)
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        localStorage.removeItem('userId')
        setToken('');
        setUserType('')
        setUserId('')
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userType = localStorage.getItem('userType');
        const userId = localStorage.getItem('userId')

        if (token) {
            setToken(token);
        }
        if (userType) {
            setUserType(userType);
        }
        if (userId) setUserId(userId)
    }, []);

    return (
        <AuthContext.Provider value={{ storeUser, isAuthenticated, token, userType, logout, userId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);