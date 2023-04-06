import React, {createContext, useEffect, useState} from 'react';
import {CAFES} from '../../constants';
import {Cafe} from '../../types/Cafe';
import { fetchData } from '../../utils/fetchClient';
import cafesFromServer from '../../api/cafes.json'

export type CafeContext = {
    cafes: Cafe[];
    drawerWidth: number;
    footerHeight: number;
    isSidebarOpen: boolean;
    isAuth: boolean;
    totalPages: number;
    setCafes: (cafes: Cafe[]) => void;
    setCurrentPage: (page: number) => void;
    setAuth: (auth: boolean) => void;
    setSidebarOpen: (status: boolean) => void;
}

export const CafeContext = createContext<CafeContext>({
    cafes: [],
    drawerWidth: 0,
    footerHeight: 0,
    isSidebarOpen: false,
    isAuth: false,
    totalPages: 0,
    setCafes: () => {},
    setCurrentPage: () => {},
    setAuth: () => {},
    setSidebarOpen: () => {},
});

export const CafeContextProvider = (
    { children } : { children: React.ReactNode }
) => {
    const [cafes, setCafes] = useState<Cafe[]>([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isAuth, setAuth] = useState(true)
    const [currentPage, setCurrentPage] = useState(0);
    const drawerWidth = 300;
    const footerHeight = 60;
    let totalPages = 0;


    const fetchCafes = async () => {
        const { data: cafes } = await fetchData(CAFES(currentPage));
        setCafes(cafes);
    };


    useEffect( () => {
        fetchCafes();
    }, [currentPage])

    return (
        <CafeContext.Provider
            value={{
                cafes,
                drawerWidth,
                footerHeight,
                isSidebarOpen,
                isAuth,
                totalPages,
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
