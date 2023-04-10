import React, {
    createContext,
    useEffect,
    useState
} from 'react';
import {
    BASE_URL, FILTERED, SORTED_BY
} from '../../constants';
import {Cafe} from '../../types/Cafe';
import {fetchData} from '../../utils/fetchClient';
import {defaultValues, FormValues} from '../../components/FilterForm';



export type CafeContext = {
    cafes: Cafe[];
    drawerWidth: number;
    isSidebarOpen: boolean;
    isAuth: boolean;
    totalPages: number;
    currentPage: number;
    sortOption: string;
    setFilterOptions: (filterOptions: FormValues) => void,
    setTotalPages: (pages: number) => void;
    setCafes: (cafes: Cafe[]) => void;
    setCurrentPage: (page: number) => void;
    setAuth: (auth: boolean) => void;
    setSidebarOpen: (status: boolean) => void;
    setSortOption: (option: string) => void;
}

export const CafeContext = createContext<CafeContext>({
    cafes: [],
    drawerWidth: 0,
    isSidebarOpen: false,
    isAuth: false,
    totalPages: 0,
    currentPage: 0,
    sortOption: '',
    setFilterOptions: () => {
    },
    setTotalPages: () => {
    },
    setCafes: () => {
    },
    setCurrentPage: () => {
    },
    setAuth: () => {
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
    const [isAuth, setAuth] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [sortOption, setSortOption] = useState('');
    const [filterOptions, setFilterOptions] = useState<FormValues>(defaultValues)
    // const [fetchLink, setFetchLink] = useState(BASE_URL)
    //
    // const linkCheck = (linkPart: string) => {
    //     if (fetchLink === BASE_URL) {
    //         setFetchLink(state => state + '?' + linkPart)
    //         return;
    //     }
    //
    //     setFetchLink(state => state + '&' + linkPart)
    // }
    // console.log(fetchLink)

    let sortingLink = BASE_URL;



    const fetchSortedCafes = async () => {
        const {data: sortedCafes} = await fetchData(sortingLink);
        setCafes(sortedCafes);
        setTotalPages(sortedCafes[0].totalPages);
    }

    useEffect(() => {
        sortingLink += SORTED_BY(currentPage, sortOption) + FILTERED(filterOptions)
        fetchSortedCafes();
    }, [sortOption, currentPage, filterOptions])



    return (
        <CafeContext.Provider
            value={{
                cafes,
                drawerWidth,
                isSidebarOpen,
                isAuth,
                totalPages,
                currentPage,
                sortOption,
                setFilterOptions,
                setTotalPages,
                setCafes,
                setCurrentPage,
                setAuth,
                setSidebarOpen,
                setSortOption,
            }}
        >
            {children}
        </CafeContext.Provider>
    )
}
