import * as React from 'react';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import {Controller, useForm} from 'react-hook-form';
import Rating from '@mui/material/Rating';
import {ThumbUp} from '@mui/icons-material';
import {useState} from 'react';
import {MY_LIST_URL} from '../../../api/constants';
import {AxiosError} from 'axios';
import {LoaderButton} from '../../Loaders/LoaderButton';
import {useAxiosPrivate} from '../../../hooks/useAxiosPrivate';
import {useCafe} from '../../../hooks/useCafe';
import {Alert, Typography} from '@mui/material';

type IFormInputs = {
    text: string;
    rating: number;
}

const defaultValues = {
    text: '',
    rating: 1,
}

type Props = {
    cafeId: number;
}

export const CommentAddBox: React.FC<Props> = ({cafeId}) => {
    const { setAddedComment, addedComment } = useCafe();
    const {handleSubmit, reset, control} = useForm<IFormInputs>({ defaultValues })
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const axiosPrivate = useAxiosPrivate();

    const handleOnSubmit = async (data: IFormInputs) => {
        console.log(data)
        if (data.text.length === 0) {
            setError('Comment can not be empty!');
            return;
        } else if (data.text.length > 3000) {
            setError('Comment can not be more than 3000 symbols!');
            return;
        }

        try {
            setLoading(true);
            const response = await axiosPrivate.post(`${MY_LIST_URL}/comment`,
                JSON.stringify({
                    text: data.text,
                    rating: data.rating,
                    cafeId: cafeId
                }),
            );
            setLoading(false);
            setSuccess(true);
            setAddedComment(!addedComment);
            console.log(response.data);
            reset();

        } catch (err) {
            if (!(err instanceof AxiosError)) {return}
            setLoading(false);
            if (!err?.response) {
                setError('Check you connection...');
            }  else {
                console.log(err.response?.data);
            }
        }
    }

    const handleOnBlur = () => setError('');


    return (
        <FormControl
            onBlur={handleOnBlur}
            sx={{mt: 3}}
            component={'form'}
            onSubmit={handleSubmit(data => handleOnSubmit(data))}
        >
            {error && <Alert
                severity="error"
                sx={{
                    my: 2
                }}
            >
                {error}
            </Alert>}
            <Controller
                name={'text'}
                control={control}
                render={
                    ({field}) => (
                        <Textarea
                            {...field}
                            placeholder="Type something here…"
                            minRows={3}
                            endDecorator={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 'var(--Textarea-paddingBlock)',
                                        pt: 'var(--Textarea-paddingBlock)',
                                        borderTop: '1px solid',
                                        borderColor: 'divider',
                                        flex: 'auto',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Controller
                                        render={
                                            ({field}) => (
                                                <Rating
                                                    {...field}
                                                    onChange={(_, value) => {
                                                        field.onChange(value);
                                                    }}
                                                    name={'rating'}
                                                    precision={1}
                                                    icon={<ThumbUp
                                                        fontSize={"inherit"}/>}
                                                    emptyIcon={<ThumbUp
                                                        style={{opacity: 0.55}}
                                                        fontSize="inherit"/>}
                                                />
                                            )}
                                        name="rating"
                                        control={control}
                                    />

                                    <LoaderButton
                                        variant={'contained'}
                                        size={'small'}
                                        success={success}
                                        loading={loading}
                                        type="submit"
                                        sx={{textTransform: 'none'}}
                                    >
                                        Send
                                    </LoaderButton>
                                </Box>
                            }
                            sx={{
                                minWidth: 300,
                            }}
                        />
                    )
                }
            />
        </FormControl>
    );
}
