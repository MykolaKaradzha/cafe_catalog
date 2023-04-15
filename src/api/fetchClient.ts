import axios from "axios"
import { BASE_URL } from "./constants";

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    },
    withCredentials: true
});


export const fetchData=(api_link: string)=>axios.get(api_link);
