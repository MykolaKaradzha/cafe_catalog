import React, {useContext} from 'react';
import {useForm, Controller} from "react-hook-form";
import {
    Box,
    Button,
    Divider,
    FormControl,
    Stack,
    Switch,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import {MinimumDistanceSlider} from '../Sliders';
import {CheckboxFilter} from '../CheckboxFilter';
import {CafeContext} from '../../context/CafeContext';
import Rating from '@mui/material/Rating';
import {ThumbUp} from '@mui/icons-material';


const FilterSubtitle = (props: any) => (
    <Typography
        color="text.secondary"
        textAlign={'left'}
        sx={{
            fontWeight: 'bold'
        }}
    >
        {props.children}
    </Typography>
);

export type FormValues = {
    '$': boolean;
    '$$': boolean;
    '$$$': boolean;
    'low': boolean;
    'middle': boolean;
    'high': boolean;
    'vegan': boolean,
    'event%20room': boolean;
    'alcohol': boolean;
    'rating': number;
    'minOrder': number[];
}

export const defaultValues = {
    '$': false,
    '$$': false,
    '$$$': false,
    'low': false,
    'middle': false,
    'high': false,
    'vegan': false,
    'event%20room': false,
    'alcohol': false,
    'rating': 0,
    'minOrder': [0, 0],
};

export type option = "$" | "$$" | "$$$" | "low" | "middle" | "high";


export const FilterForm: React.FC = () => {
    const {handleSubmit, reset, control} = useForm<FormValues>({defaultValues})
    const {setFilterOptions} = useContext(CafeContext);

    const priceOptions: option[] = ['$', '$$', '$$$'];
    const noiseOptions: option[] = ['low', 'middle', 'high'];

    const handleOnSubmit = (data: FormValues) => {
        setFilterOptions(data)
    }

    const resetOnClick = () => {
        reset();
        handleSubmit(handleOnSubmit)()
    }

    return (
        <form
            style={{height: '100%'}}
            onSubmit={handleSubmit(handleOnSubmit)}
        >
            <FormControl
                sx={{display: 'flex', flexDirection: 'column', height: '100%'}}
            >
                <Box sx={{flexGrow: 1}}>
                    <Divider/>

                    <Stack
                        direction='row'
                        alignItems='baseline'
                        justifyContent='space-between'
                        sx={{
                            my: 1,
                            mx: 4,
                            px: 1,
                        }}
                    >
                        <Typography
                            sx={{fontWeight: 'bold'}}
                        >
                            Filter by:
                        </Typography>
                        <Typography
                            variant="body2"
                            component={Button}
                            onClick={resetOnClick}
                            sx={{
                                color: '#29cccc',
                                fontSize: '0.75rem',
                                fontWeight: 'bold'
                            }}
                        >
                            Reset Filters:
                        </Typography>
                    </Stack>
                    <Divider/>

                    <Stack
                        spacing={3}
                        sx={{
                            mt: 2,
                            mx: 'auto',
                            width: '80%',
                        }}
                    >
                        <Stack direction={'column'} spacing={1}>
                            <FilterSubtitle
                            >
                                Price
                            </FilterSubtitle>

                            <CheckboxFilter options={priceOptions} control={control}/>
                        </Stack>

                        <Stack direction={'column'} spacing={1}>
                            <FilterSubtitle
                            >
                                Noise
                            </FilterSubtitle>

                            <CheckboxFilter options={noiseOptions} control={control}/>
                        </Stack>

                        <Stack direction={'column'} spacing={1}>
                            <FilterSubtitle
                            >
                                Vegan Friendly
                            </FilterSubtitle>
                            <Controller
                                render={({field}) => (
                                    <Switch
                                        color={'success'}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        checked={field.value}
                                    />
                                )}
                                name={'vegan'}
                                control={control}
                            />
                        </Stack>

                        <Stack direction={'column'} spacing={1}>
                            <FilterSubtitle
                            >
                                Alcohol Available
                            </FilterSubtitle>

                            <Controller
                                render={({field}) => (
                                    <Switch
                                        color={'secondary'}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        checked={field.value}
                                    />
                                )}
                                name={'alcohol'}
                                control={control}
                            />
                        </Stack>

                        <Stack direction={'column'} spacing={1}>
                            <FilterSubtitle
                            >
                                Event room available
                            </FilterSubtitle>
                            <Controller
                                render={({field}) => (
                                    <Switch
                                        color={'warning'}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        checked={field.value}
                                    />
                                )}
                                name={'event%20room'}
                                control={control}
                            />
                        </Stack>

                        <Stack direction={'column'} spacing={1}>
                            <FilterSubtitle
                            >
                                Minimum Order
                            </FilterSubtitle>

                            <MinimumDistanceSlider control={control} />
                        </Stack>

                        <Stack direction={'column'} spacing={1}>
                            <FilterSubtitle
                            >
                                Minimum Rating
                            </FilterSubtitle>

                            <Controller
                                render={
                                    ({field}) => (
                                        <Rating
                                            {...field}
                                            onChange={(_, value) => {
                                                field.onChange(value);
                                            }}
                                            name={'rating='}
                                            precision={1}
                                            icon={<ThumbUp fontSize={"inherit"}/>}
                                            emptyIcon={<ThumbUp style={{opacity: 0.55}} fontSize="inherit"/>}
                                        />
                                    )}
                                name="rating"
                                control={control}
                            />
                        </Stack>
                    </Stack>
                </Box>

                <Button
                    type={'submit'}
                    variant={'contained'}
                    color={'success'}
                    sx={{
                        width: '80%',
                        mx: 'auto',
                        my: 3,
                    }}
                >
                    Done
                </Button>
            </FormControl>
        </form>
    )
};
