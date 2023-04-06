import React, {createContext, useEffect, useState} from 'react';
import {CAFES} from '../../constants';
import {Cafe} from '../../types/Cafe';
import { fetchData } from '../../utils/fetchClient';

export type CafeContext = {
    cafes: Cafe[];
    drawerWidth: number;
    isSidebarOpen: boolean;
    isAuth: boolean;
    totalPages: number;
    currentPage: number
    setCafes: (cafes: Cafe[]) => void;
    setCurrentPage: (page: number) => void;
    setAuth: (auth: boolean) => void;
    setSidebarOpen: (status: boolean) => void;
}

export const CafeContext = createContext<CafeContext>({
    cafes: [],
    drawerWidth: 0,
    isSidebarOpen: false,
    isAuth: false,
    totalPages: 0,
    currentPage: 0,
    setCafes: () => {},
    setCurrentPage: () => {},
    setAuth: () => {},
    setSidebarOpen: () => {},
});

export const CafeContextProvider = (
    { children } : { children: React.ReactNode }
) => {
    const drawerWidth = 300;
    const [cafes, setCafes] = useState<Cafe[]>([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isAuth, setAuth] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);


    const fetchCafes = async () => {
        const { data } = await fetchData(CAFES(currentPage));
        setCafes(data);
        setTotalPages(data[0].totalPages);
    };


    useEffect( () => {
        fetchCafes();
    }, [])

    return (
        <CafeContext.Provider
            value={{
                cafes,
                drawerWidth,
                isSidebarOpen,
                isAuth,
                totalPages,
                currentPage,
                setCafes,
                setCurrentPage,
                setAuth,
                setSidebarOpen,
            }}
        >
            { children }
        </CafeContext.Provider>
    )
}
