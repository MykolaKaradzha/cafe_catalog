import React, {useContext} from "react";
import {
    Avatar,
    Button,
    Card,
    Stack,
    Typography,
    TextField,
    Box,
} from "@mui/material";
import {CustomRating} from '../../CustomRating';
import {CafeContext} from '../../CafeContext';


export const CommentCard: React.FC = () => {
    const {isAuth} = useContext(CafeContext);
    return (
        <Card
            sx={{
                p: 2,
                backgroundColor: '#cfe2e6',
            }}
        >
            <Stack sx={{width: '100%'}} spacing={1} direction='row'>
                <Typography
                    fontWeight="bold"
                    sx={{
                        pb: 1,
                        mr: 'auto',
                    }}
                >
                    UserName
                </Typography>
                <CustomRating isAuth={isAuth}/>
            </Stack>
            <Typography variant='body2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                in
                culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
        </Card>)
}
