"use client"
import React, { createContext, useState, useEffect, useContext } from 'react';
import { usePathname } from 'next/navigation';


interface DataTableContextData {
    tableType: string
}

export const DataTableContext = createContext<DataTableContextData>({} as DataTableContextData);



export const DataTableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [tableType, setTableType] = useState<string>('');

    
    return (
        <DataTableContext.Provider value={{ tableType }}>
            {children}
        </DataTableContext.Provider>
    );
}

export default DataTableProvider