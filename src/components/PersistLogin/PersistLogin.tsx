import {useCafe} from '../../hooks/useCafe';
import {Outlet} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useRefreshToken} from '../../hooks/useRefreshToken';
import {Loader} from '../Loaders/Loader';

export const PersistLogin = () => {
    const { authData, setAuthData } = useCafe();
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                // @ts-ignore
                const authData = JSON.parse(localStorage.getItem('authData'))
                setAuthData(authData)
                await refresh();
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false);
            }
        }
        !authData?.token ? verifyRefreshToken() : setIsLoading(false);
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`at: ${JSON.stringify(authData?.token)}`);
    }, [isLoading]);

    return (
        isLoading
            ? <Loader />
            : <Outlet />
    )
}
