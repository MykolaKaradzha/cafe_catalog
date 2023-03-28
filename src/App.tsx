import React from 'react';
import './App.css';
import {CssBaseline} from '@mui/material';
import {Catalog} from './components/Catalog';

import {CafeContextProvider} from './components/CafeContext';

function App() {

    return (
        <>
            <CafeContextProvider>
                <Catalog/>
            </CafeContextProvider>
            <CssBaseline/>
        </>
    );
}

export default App;
