import * as React from 'react';
import Box from '@mui/material/Box';
import Slider, {SliderThumb} from '@mui/material/Slider';

function valuetext(value: number) {
    return `${value}°C`;
}

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 50,
        label: '50',
    },
    {
        value: 100,
        label: '100',
    },
    {
        value: 150,
        label: '150',
    },
    {
        value: 200,
        label: '200',
    },
];

const minDistance = 50;

export const MinimumDistanceSlider = () => {

    const [value2, setValue2] = React.useState<number[]>([0, 50]);

    const handleChange2 = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue2([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue2([clamped - minDistance, clamped]);
            }
        } else {
            setValue2(newValue as number[]);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Slider
                getAriaLabel={() => 'Minimum distance shift'}
                value={value2}
                onChange={handleChange2}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0}
                max={200}
                step={minDistance}
                disableSwap
                marks={marks}
            />
        </Box>
    );
}
