import React, {
    createContext,
    useState
} from 'react';
import {Cafe} from '../../types/Cafe';
import {defaultValues, FormValues} from '../../components/FilterForm';
import {AuthData} from '../../types/AuthData';

export type CafeContext = {
    cafes: Cafe[];
    drawerWidth: number;
    isSidebarOpen: boolean;
    authData: AuthData | null;
    totalPages: number;
    currentPage: number;
    sortOption: string;
    filterOptions: FormValues,
    isPopUpOpen: boolean;
    setPopUpOpen: (status: boolean) => void;
    setFilterOptions: (filterOptions: FormValues) => void,
    setTotalPages: (pages: number) => void;
    setCafes: (cafes: Cafe[]) => void;
    setCurrentPage: (page: number) => void;
    setAuthData: (authData: AuthData | null) => void;
    setSidebarOpen: (status: boolean) => void;
    setSortOption: (option: string) => void;
}

export const CafeContext = createContext<CafeContext>({
    cafes: [],
    drawerWidth: 0,
    isSidebarOpen: false,
    authData: null,
    totalPages: 0,
    currentPage: 0,
    sortOption: '',
    filterOptions: defaultValues,
    isPopUpOpen: false,
    setPopUpOpen:  () => {
    },
    setFilterOptions: () => {
    },
    setTotalPages: () => {
    },
    setCafes: () => {
    },
    setCurrentPage: () => {
    },
    setAuthData: () => {
    },
    setSidebarOpen: () => {
    },
    setSortOption: () => {
    },
});

export const CafeContextProvider = (
    {children}: { children: React.ReactNode }
) => {

    const drawerWidth = 300;
    const [cafes, setCafes] = useState<Cafe[]>([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [authData, setAuthData] = useState<AuthData | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [sortOption, setSortOption] = useState('');
    const [filterOptions, setFilterOptions] = useState<FormValues>(defaultValues);
    const [isPopUpOpen, setPopUpOpen] = React.useState(false);


    return (
        <CafeContext.Provider
            value={{
                cafes,
                drawerWidth,
                isSidebarOpen,
                authData,
                totalPages,
                currentPage,
                sortOption,
                filterOptions,
                isPopUpOpen,
                setPopUpOpen,
                setFilterOptions,
                setTotalPages,
                setCafes,
                setCurrentPage,
                setAuthData,
                setSidebarOpen,
                setSortOption,
            }}
        >
            {children}
        </CafeContext.Provider>
    )
}
