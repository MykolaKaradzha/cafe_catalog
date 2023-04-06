import axios from "axios"

export const fetchData=(api_link: string)=>axios.get(api_link);
