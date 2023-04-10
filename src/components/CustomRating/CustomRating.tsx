import React from 'react';

import Rating from '@mui/material/Rating';
import {ThumbUp} from '@mui/icons-material';


type Props = {
    isAuth: boolean
}

export const CustomRating: React.FC<Props> = ({isAuth,}) => {

    return (
        <Rating
            name={'rating='}
            disabled={!isAuth}
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

