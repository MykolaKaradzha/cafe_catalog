import {useCafe} from "./useCafe"
import {axiosDefault} from '../api/fetchClient';

export const useRefreshToken = () => {
    const { setAuthData } = useCafe();

    const refresh = async () => {
        const response = await axiosDefault.post('auth/refresh-token' );
        // @ts-ignore
        setAuthData( prev => {
            return {...prev, token: response.data.token};
        });
        return response.data.token;
    }
    return refresh;
}
