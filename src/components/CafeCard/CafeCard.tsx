import React from 'react';
import {Movie} from '../../types/Movie';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material';

type Props = {
    cafe: Movie,
};

export const CafeCard: React.FC<Props> = ({cafe}) => (
    <Card sx={{maxWidth: 345}}>
        <CardActionArea>
            <CardMedia
                component="img"
                image={cafe.imgUrl}
                alt="Film logo"
            >
            </CardMedia>
        </CardActionArea>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {cafe.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {cafe.description}
            </Typography>
        </CardContent>
    </Card>
);
