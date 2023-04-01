import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {styled} from '@mui/material/styles';
import Rating from '@mui/material/Rating';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ab2a96 ',
    },
    '& .MuiRating-iconHover': {
        color: '#772aab',
    },
});

export const CustomRating: React.FC = () => {
    return (
        <StyledRating
        defaultValue={2}
        getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit"/>}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit"/>}
        sx={{
            mt: {xs: 3, sm: 0},
        }}
    />
    )
};
