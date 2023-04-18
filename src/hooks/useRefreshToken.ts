import {useCafe} from "./useCafe"
import {axiosPrivate} from '../api/fetchClient';

export const useRefreshToken = () => {
    const { setAuthData } = useCafe();

    const refresh = async () => {
        const response = await axiosPrivate.post('auth/refresh-token' )
        // @ts-ignore
        setAuthData( prev => {
            return {...prev, token: response.data.token};
        });
        return response.data.token;
    }
    return refresh;
}
