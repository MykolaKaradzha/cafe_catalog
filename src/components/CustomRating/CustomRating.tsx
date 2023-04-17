import React from 'react';

import Rating from '@mui/material/Rating';
import {ThumbUp} from '@mui/icons-material';
import {AuthData} from '../../types/AuthData';


type Props = {
    authData: AuthData | null
}

export const CustomRating: React.FC<Props> = ({ authData}) => {

    return (
        <Rating
            name={'rating='}
            disabled={!authData}
            getLabelText={(value: number) => `${value} Thumbs${value !== 1 ? 's' : ''}`}
            precision={1}
            sx={{
                mt: {xs: 3, sm: 0},
            }}
            icon={<ThumbUp fontSize={"inherit"}/>}
            emptyIcon={<ThumbUp style={{opacity: 0.55}} fontSize="inherit"/>}
        />
    )
}

