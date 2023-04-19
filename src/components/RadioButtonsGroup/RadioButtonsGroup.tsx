import {
    FormControlLabel,
    RadioGroup,
    Radio,
} from '@mui/material';
import React from 'react';
import {FormValues} from '../FilterForm';
import {Control, Controller} from "react-hook-form";


type Props = {
    name: 'alcohol' | 'event%20room' | 'vegan';
    control: Control<FormValues>;
}

export const RadioButtonsGroup: React.FC<Props> = ({name, control}) => {
    return (
        <Controller
            render={({ field }) => (
                <RadioGroup
                    aria-label={name}
                    {...field}
                    row
                >
                    <FormControlLabel
                        value={'yes'}
                        control={<Radio color={'success'}/>}
                        label="Yes"
                    />

                    <FormControlLabel
                        value={'no'}
                        control={<Radio color={'error'}/>}
                        label="No"
                    />

                    <FormControlLabel
                        value={''}
                        control={<Radio />}
                        label="All"
                    />
                </RadioGroup>
            )}
            name={name}
            control={control}
        />)
}
