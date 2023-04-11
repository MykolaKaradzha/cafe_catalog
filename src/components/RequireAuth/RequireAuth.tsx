import {useCafe} from '../../hooks/useCafe';
import {useLocation, Navigate, Outlet} from 'react-router-dom';

export const RequireAuth = () => {
    const { isAuth } = useCafe();
    const location = useLocation();

    return (
        isAuth
            ? <Outlet />
            : <Navigate to={'/signin'} state={{ from: location }} replace/>
    )
}
