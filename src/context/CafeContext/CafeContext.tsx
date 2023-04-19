import React, {
    createContext,
    useState
} from 'react';
import {defaultValues, FormValues} from '../../components/FilterForm';
import {AuthData} from '../../types/AuthData';
import {Cafe} from '../../types/Cafe';

export type CafeContext = {
    favouriteCafes: Cafe[];
    drawerWidth: number;
    isSidebarOpen: boolean;
    authData: AuthData | null;
    isPopUpOpen: boolean;
    setFavouriteCafes: (cafes: Cafe[]) => void;
    totalPagesMyList: number;
    currentPageMyList: number;
    sortOptionMyList: string;
    setTotalPagesMyList: (pages: number) => void;
    setCurrentPageMyList: (page: number) => void;
    setSortOptionMyList: (option: string) => void;
    totalPagesCatalog: number;
    currentPageCatalog: number;
    filterOptionsCatalog: FormValues;
    sortOptionCatalog: string;
    setFilterOptionsCatalog: (filterOptions: FormValues) => void;
    setTotalPagesCatalog: (pages: number) => void;
    setCurrentPageCatalog: (page: number) => void;
    setSortOptionCatalog: (option: string) => void;
    setPopUpOpen: (status: boolean) => void;
    setAuthData: (authData: AuthData | null) => void;
    setSidebarOpen: (status: boolean) => void;
    addedToFavourite: boolean,
    setAddedToFavourite: (option: boolean) => void;
    addedComment: boolean,
    setAddedComment: (option: boolean) => void;

}

export const CafeContext = createContext<CafeContext>({
    favouriteCafes: [],
    drawerWidth: 0,
    isSidebarOpen: false,
    authData: null,
    isPopUpOpen: false,
    totalPagesCatalog: 0,
    currentPageCatalog: 0,
    sortOptionCatalog: '',
    filterOptionsCatalog: defaultValues,
    totalPagesMyList: 0,
    currentPageMyList: 0,
    sortOptionMyList: '',
    setFavouriteCafes: () => {
    },
    setPopUpOpen:  () => {
    },
    setAuthData: () => {
    },
    setSidebarOpen: () => {
    },
    setFilterOptionsCatalog: () => {
    },
    setTotalPagesCatalog: () => {
    },
    setCurrentPageCatalog: () => {
    },
    setSortOptionCatalog: () => {
    },
    setTotalPagesMyList: () => {
    },
    setCurrentPageMyList: () => {
    },
    setSortOptionMyList: () => {
    },
    addedToFavourite: false,
    setAddedToFavourite: () => {
    },
    addedComment: false,
    setAddedComment: () => {
    }
});

export const CafeContextProvider = (
    {children}: { children: React.ReactNode }
) => {

    const drawerWidth = 300;
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [authData, setAuthData] = useState<AuthData | null>(null);
    const [isPopUpOpen, setPopUpOpen] = React.useState(false);

    const [currentPageCatalog, setCurrentPageCatalog] = useState(0);
    const [totalPagesCatalog, setTotalPagesCatalog] = useState(0);
    const [sortOptionCatalog, setSortOptionCatalog] = useState('');
    const [filterOptionsCatalog, setFilterOptionsCatalog] = useState<FormValues>(defaultValues);

    const [favouriteCafes, setFavouriteCafes] = useState<Cafe[]>([]);
    const [currentPageMyList, setCurrentPageMyList] = useState(0);
    const [totalPagesMyList, setTotalPagesMyList] = useState(0);
    const [sortOptionMyList, setSortOptionMyList] = useState('');

    const [addedToFavourite, setAddedToFavourite] = useState(false);
    const [addedComment, setAddedComment] = useState(false);


    return (
        <CafeContext.Provider
            value={{
                favouriteCafes,
                drawerWidth,
                isSidebarOpen,
                authData,
                totalPagesCatalog,
                currentPageCatalog,
                sortOptionCatalog,
                filterOptionsCatalog,
                isPopUpOpen,
                currentPageMyList,
                setCurrentPageMyList,
                totalPagesMyList,
                setSortOptionMyList,
                setTotalPagesMyList,
                sortOptionMyList,
                setFavouriteCafes,
                setPopUpOpen,
                setFilterOptionsCatalog,
                setTotalPagesCatalog,
                setCurrentPageCatalog,
                setAuthData,
                setSidebarOpen,
                setSortOptionCatalog,
                addedToFavourite,
                setAddedToFavourite,
                addedComment,
                setAddedComment,
            }}
        >
            {children}
        </CafeContext.Provider>
    )
}
