import React, {useContext} from 'react'

import {CafeContext} from '../../context/CafeContext';
import {Pagination} from '@mui/material';



export const CustomPagination = () => {
    const {setCurrentPage, totalPages} = useContext(CafeContext);
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page - 1);
    }


    return (
        <Pagination
            count={totalPages}
            color="secondary"
            onChange={handlePageChange}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 6,
            }}
        />
    )
}


