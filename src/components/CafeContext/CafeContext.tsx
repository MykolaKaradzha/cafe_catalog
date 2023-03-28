import React, {createContext, useState} from 'react';
import moviesFromServer from '../../api/movies.json'


export const CafeContext = createContext({});

export const CafeContextProvider = (
    { children } : { children: React.ReactNode }
) => {
    const [cafes, setCafes] = useState(moviesFromServer)

    return (
        <CafeContext.Provider
            value={{
                cafes,
                setCafes,
            }}
        >
            { children }
        </CafeContext.Provider>
    )
}
