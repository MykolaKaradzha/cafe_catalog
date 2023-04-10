import * as React from 'react';
import Box from '@mui/material/Box';
import Slider, {SliderThumb} from '@mui/material/Slider';
import {FormValues} from '../FilterForm';
import {Control, Controller} from "react-hook-form";

function valuetext(value: number) {
    return `${value}`;
}

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 100,
        label: '100',
    },
    {
        value: 200,
        label: '200',
    },
    {
        value: 300,
        label: '300',
    },
    {
        value: 400,
        label: '400',
    },
    {
        value: 500,
        label: '500',
    },
];

const minDistance = 0;

type Props = {
    control: Control<FormValues>;
}

export const MinimumDistanceSlider: React.FC<Props> = ({control}) => {

    return (
        <Controller
            name="minOrder"
            control={control}
            defaultValue={[0, 10]}
            render={({ field }) => (
                <Slider
                    {...field}
                    onChange={(_, value) => {
                        field.onChange(value);
                    }}
                    valueLabelDisplay="auto"
                    marks={marks}
                    min={0}
                    max={500}
                    step={minDistance}
                />
            )}
        />
    );
}
