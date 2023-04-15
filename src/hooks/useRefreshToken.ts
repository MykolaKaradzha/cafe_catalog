import {useCafe} from "./useCafe"
import {axiosPrivate} from '../api/fetchClient';

export const useRefreshToken = () => {
    const { setAuthData } = useCafe();

    const refresh = async () => {
        const response = await axiosPrivate.get('/refresh-token', )
        // @ts-ignore
        setAuthData( prev => {
            return {...prev, accessToken: response.data.token};
        });
        return response.data.accessToken;
    }
    return refresh;
}
