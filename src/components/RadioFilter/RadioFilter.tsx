import {FormControlLabel, Checkbox, RadioGroup, Stack} from '@mui/material';
import React from 'react';

type Props = {
    options: string[]
}

export const RadioFilter: React.FC<Props> = ({options}) => {
    return (
        <Stack direction={'row'}>
            {options.map((option, index) => {
                let control;
                switch (index) {
                    case 0:
                        control = <Checkbox color={'success'}/>
                        break;
                    case 1:
                        control = <Checkbox color={'warning'}/>
                        break;
                    case 2:
                        control = <Checkbox color={'error'}/>
                        break;
                    default:
                        return <Checkbox color={'primary'}/>
                }
                return (
                    <FormControlLabel
                        key={option}
                        value={option}
                        control={control}
                        label={option}
                        labelPlacement="top"
                    />
                )
            })}
        </Stack>)
}
