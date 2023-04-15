import React, {
    createContext,
    useEffect,
    useState
} from 'react';
import {
    BASE_URL, CAFES_URL, FILTERED, SORTED_BY
} from '../../api/constants';
import {Cafe} from '../../types/Cafe';
import {fetchData} from '../../api/fetchClient';
import {defaultValues, FormValues} from '../../components/FilterForm';

export type CafeContext = {
    cafes: Cafe[];
    drawerWidth: number;
    isSidebarOpen: boolean;
    authData: AuthData | null;
    totalPages: number;
    currentPage: number;
    sortOption: string;
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

export type AuthData = {
    email: string;
    username: string;
    token: string;
}

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
    let sortingLink = CAFES_URL;


    const fetchSortedCafes = async () => {
        const {data: sortedCafes} = await fetchData(sortingLink);
        setCafes(sortedCafes);
        setTotalPages(sortedCafes[0].totalPages);
    }

    useEffect(() => {
        sortingLink += SORTED_BY(sortOption) + FILTERED(filterOptions, currentPage)
        fetchSortedCafes();
    }, [sortOption, currentPage, filterOptions])


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
