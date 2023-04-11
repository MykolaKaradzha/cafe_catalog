import { useContext } from 'react';
import {CafeContext} from '../context/CafeContext';


export const useCafe = () => {
    return useContext(CafeContext)
}
