import React, {FC} from 'react'
import {Pagination} from '@mui/material';


type Props = {
    currentPage: number;
    setPage: (page: number) => void;
    totalPages: number;
}

export const CustomPagination: FC<Props> = ({setPage, totalPages, currentPage}) => {

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page - 1);
    }

    return (
        <Pagination
            count={totalPages}
            page={currentPage + 1}
            onChange={handlePageChange}

            sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 6,
            }}
        />
    )
}


