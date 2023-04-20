import {useCafe} from "./useCafe"
import axios from 'axios';
import {BASE_URL} from '../api/constants';

export const useRefreshToken = () => {
    const { setAuthData, authData } = useCafe();
    const axiosRefresh = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authData?.token}`,
        },
        withCredentials: true
    });

    const refresh = async () => {
        try {
            const response = await axiosRefresh.post('auth/refresh-token' );
            // @ts-ignore
            setAuthData( prev => {
                return {...prev, token: response.data.token};
            });
            return response.data.token;
        } catch (err) {
            console.log(err);
        }

    }
    return refresh;
}
