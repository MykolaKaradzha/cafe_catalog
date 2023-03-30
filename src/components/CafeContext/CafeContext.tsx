import React, {createContext, useEffect, useState} from 'react';
import moviesFromServer from '../../api/movies.json'
import {Movie} from '../../types/Movie';

export type CafeContext = {
    cafes: Movie[];
    drawerWidth: number;
    isSidebarOpen: boolean;
    getSideBarStatus: (status: boolean) => void;
} | null

export const CafeContext = createContext<CafeContext>(null);

export const CafeContextProvider = (
    { children } : { children: React.ReactNode }
) => {
    const [cafes, setCafes] = useState<Movie[]>([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const drawerWidth = 300;

    const getSideBarStatus = (status: boolean) => setSidebarOpen(status);

    useEffect( () => setCafes(moviesFromServer), [])

    return (
        <CafeContext.Provider
            value={{
                cafes,
                drawerWidth,
                isSidebarOpen,
                getSideBarStatus,
            }}
        >
            { children }
        </CafeContext.Provider>
    )
}
