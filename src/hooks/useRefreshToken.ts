import {useCafe} from "./useCafe"
import {axiosInstance} from '../api/fetchClient';

export const useRefreshToken = () => {
    const {setAuth} = useCafe();

    const refresh = async () => {
        const response = await axiosInstance.get('/refresh', {
            withCredentials: true
        })
        // setAuth(prev => {
        //     return {...prev, accessToken: response.data.accessToken};
        // });
        return response.data.accessToken;
    }
    return refresh;
}
