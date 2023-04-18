import React from 'react';

import Rating from '@mui/material/Rating';
import {ThumbUp} from '@mui/icons-material';
import styled from '@emotion/styled';


type Props = {
    rating: number | null;
    editable: boolean
}

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff9900',
    },
    '& .Mui-disabled': {
        opacity: 1,
    },
});

export const CustomRating: React.FC<Props> = ({rating, editable}) => {

    return (
        <StyledRating
            name={'rating'}
            disabled={!editable}
            getLabelText={(value: number) => `${value} Thumbs${value !== 1 ? 's' : ''}`}
            precision={1}
            sx={{
                mt: {xs: 3, sm: 0},
            }}
            icon={<ThumbUp fontSize={"inherit"}/>}
            emptyIcon={<ThumbUp fontSize="inherit"/>}
            value={rating}
        />
    )
}

