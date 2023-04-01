import React, {createContext, useEffect, useState} from 'react';
import cafesFromServer from '../../api/cafes.json'
import {Cafe} from '../../types/Cafe';

export type CafeContext = {
    cafes: Cafe[];
    drawerWidth: number;
    isSidebarOpen: boolean;
    currentCafe: Cafe | null;
    getSideBarStatus: (status: boolean) => void;
    selectCafe: (cafeID: number) => void;

}

export const CafeContext = createContext<CafeContext>({
    cafes: [],
    drawerWidth: 0,
    isSidebarOpen: false,
    currentCafe: null,
    getSideBarStatus: () => {},
    selectCafe: () => {},
});

export const CafeContextProvider = (
    { children } : { children: React.ReactNode }
) => {
    const [cafes, setCafes] = useState<Cafe[]>([]);
    const [currentCafe, setCurrentCafe] = useState<Cafe | null>(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const drawerWidth = 300;

    const getSideBarStatus = (status: boolean) => setSidebarOpen(status);
    const selectCafe = (cafeID: number) => {
        const cafe = cafes.find(cafe => cafeID === cafe.id);

        if (!cafe) {
            return
        }

        setCurrentCafe(cafe);
    }

    useEffect( () => setCafes(cafesFromServer), [])

    return (
        <CafeContext.Provider
            value={{
                cafes,
                drawerWidth,
                isSidebarOpen,
                currentCafe,
                getSideBarStatus,
                selectCafe,
            }}
        >
            { children }
        </CafeContext.Provider>
    )
}
