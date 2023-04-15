import {useCafe} from '../../hooks/useCafe';
import {useLocation, Navigate, Outlet} from 'react-router-dom';

export const RequireAuth = () => {
    const { authData } = useCafe();
    const location = useLocation();

    return (
        authData
            ? <Outlet />
            : <Navigate to={'/signin'} state={{ from: location }} replace/>
    )
}
