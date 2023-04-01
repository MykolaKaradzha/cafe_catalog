import React from 'react';
import './App.css';
import {CssBaseline} from '@mui/material';
import {Routes,Route} from 'react-router-dom';
import {CafeContextProvider} from './components/CafeContext';
import {Catalog} from './Pages/Catalog';
import {NotFound} from './Pages/NotFound';
import {CafeDetails} from './Pages/CafeDetails';





function App() {

    return (
        <>
            <CafeContextProvider>
                <Routes>
                        <Route path='/' element={<Catalog />}/>
                        <Route path='/:id' element={<CafeDetails />}/>
                        <Route path='*' element={<NotFound />}/>
                    </Routes>
            </CafeContextProvider>
    <CssBaseline/>
        </>
    );
}

export default App;
