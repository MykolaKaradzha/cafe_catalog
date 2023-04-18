import {useCafe} from "./useCafe"
import {axiosPrivate} from '../api/fetchClient';
import {useRefreshToken} from './useRefreshToken';
import {useEffect} from "react";

export const useAxiosPrivate = () => {
    const { authData } = useCafe();
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                // checking if it is first attempt
                if (!config.headers['Authorization']) {
                    // if it is, then assigning accessToken to a header
                    config.headers['Authorization'] = `Bearer ${authData?.token}`
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;

                //403 - expired access token
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }

                return Promise.reject(error);
            }
        );
            //cleanup function to remove interceptor
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [authData, refresh])

    return axiosPrivate;
}
