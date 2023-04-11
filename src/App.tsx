import React from 'react';
import './App.css';
import {CssBaseline} from '@mui/material';
import {Routes, Route} from 'react-router-dom';
import {Catalog} from './Pages/Catalog';
import {NotFound} from './Pages/NotFound';
import {CafeDetails} from './Pages/CafeDetails';
import {SignIn} from './Pages/SignIn';
import {CafeContextProvider} from './context/CafeContext';
import {SignUp} from './Pages/SignUp';
import {RequireAuth} from './components/RequireAuth';
import {MyList} from './Pages/MyList';

function App() {

    return (
        <>
            <CssBaseline/>
            <CafeContextProvider>
                <Routes>
                    <Route path='/' element={<Catalog/>}/>
                    <Route path='/:id' element={<CafeDetails/>}/>
                    <Route path='/signup' element={<SignUp/>}/>
                    <Route path='/signin' element={<SignIn/>}/>
                    <Route path='*' element={<NotFound/>}/>
                    <Route element={<RequireAuth />}>
                        {/*    routes can not be accessed if not authorized*/}
                        <Route path='/mylist' element={<MyList />}/>
                    </Route>
                </Routes>
            </CafeContextProvider>
        </>
    );
}

export default App;
