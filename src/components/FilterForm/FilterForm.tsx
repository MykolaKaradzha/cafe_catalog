import React, {useEffect} from 'react';
import {useForm, Controller} from "react-hook-form";
import {
    Box,
    Button,
    Divider,
    FormControl,
    Stack,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import {MinimumDistanceSlider} from '../Sliders';
import {CheckboxFilter} from '../CheckboxFilter';
import Rating from '@mui/material/Rating';
import {ThumbUp} from '@mui/icons-material';
import {useCafe} from '../../hooks/useCafe';
import {RadioButtonsGroup} from '../RadioButtonsGroup';


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
    'vegan': string,
    'event%20room': string;
    'alcohol': string;
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
    'vegan': '',
    'event%20room': '',
    'alcohol': '',
    'rating': 0,
    'minOrder': [0, 0],
};

export type option = "$" | "$$" | "$$$" | "low" | "middle" | "high";


export const FilterForm: React.FC = () => {
    const {handleSubmit, reset, control, setValue} = useForm<FormValues>({defaultValues})
    const {setFilterOptionsCatalog, setSidebarOpen, setCurrentPageCatalog, filterOptionsCatalog} = useCafe();

    const priceOptions: option[] = ['$', '$$', '$$$'];
    const noiseOptions: option[] = ['low', 'middle', 'high'];

    const handleOnSubmit = (data: FormValues) => {
        console.log(data)
        setFilterOptionsCatalog(data);
        setSidebarOpen(false);
        setCurrentPageCatalog(0);
    }

    const resetOnClick = () => {
        reset();
        handleSubmit(handleOnSubmit)()
    }

    useEffect(() => {
        if (filterOptionsCatalog) {
            Object.entries(filterOptionsCatalog).forEach(
                ([name, value]: any) => setValue(name, value));
        }
    }, []);

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
                            mx: 2,
                        }}
                    >
                        <Typography
                            sx={{fontWeight: 'bold'}}
                        >
                            Filter by:
                        </Typography>
                        <Button
                            color={'error'}
                            variant={'contained'}
                            size={'small'}
                            onClick={resetOnClick}
                        >
                            Reset Filters
                        </Button>
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

                        <RadioButtonsGroup control={control} name={'vegan'}/>
                        </Stack>

                        <Stack direction={'column'} spacing={1}>
                            <FilterSubtitle
                            >
                                Alcohol Available
                            </FilterSubtitle>

                            <RadioButtonsGroup control={control} name={'alcohol'}/>
                        </Stack>

                        <Stack direction={'column'} spacing={1}>
                            <FilterSubtitle
                            >
                                Event room available
                            </FilterSubtitle>

                            <RadioButtonsGroup control={control} name={'event%20room'}/>
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
                                            name={'rating'}
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
