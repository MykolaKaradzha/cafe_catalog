import React, {createContext, useEffect, useState} from 'react';
import moviesFromServer from '../../api/movies.json'
import {Movie} from '../../types/Movie';

export type CafeContext = {
    cafes: Movie[];
} | null

export const CafeContext = createContext<CafeContext>(null);

export const CafeContextProvider = (
    { children } : { children: React.ReactNode }
) => {
    const [cafes, setCafes] = useState<Movie[]>([]);

    useEffect( () => setCafes(moviesFromServer), [])

    return (
        <CafeContext.Provider
            value={{
                cafes,
            }}
        >
            { children }
        </CafeContext.Provider>
    )
}
