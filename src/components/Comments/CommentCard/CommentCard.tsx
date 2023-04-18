import React from "react";
import {
    Card,
    Stack,
    Typography,
} from "@mui/material";
import {CustomRating} from '../../CustomRating';
import {Comment} from '../../../types/Cafe';

type Props = {
    comment: Comment;
}


export const CommentCard: React.FC<Props> = ({comment}) => {
    const timeTransformed = new Date(comment.publicityDate).toLocaleString('en-IE');
    return (
        <Card
            raised
            sx={{
                p: 2,
                backgroundColor: 'white',
            }}
        >
            <Stack
                sx={{width: '100%'}}
                spacing={2}
                direction='row'
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Typography
                    variant={'h6'}
                    color={'blue'}
                >
                    {comment.username}
                </Typography>
                <Typography variant={'caption'}>
                    {timeTransformed}
                </Typography>
            </Stack>
            <Stack
                sx={{width: '100%', mt: 1}}
                spacing={1}
                direction='row'
                justifyContent={'space-between'}
            >
                <Typography
                    variant={'body1'}
                    sx={{
                        width: '80%',
                        overflowWrap: 'break-word',
                    }}
                >
                    {comment.text}
                </Typography>
                <CustomRating rating={comment.rating} editable={false}/>
            </Stack>
        </Card>)
}
