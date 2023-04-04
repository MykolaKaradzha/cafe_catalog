import {FormControlLabel, Radio, RadioGroup} from '@mui/material';
import React from 'react';

type Props = {
    options: string[]
}

export const RadioFilter:React.FC<Props> = ({ options }) => {
    return (
        <RadioGroup
        row
        defaultValue={options[0]}
    >
        {options.map((option, index) => {
            let control;
            switch (index) {
                case 0:
                    control = <Radio color={'success'}/>
                    break;
                case 1:
                    control = <Radio color={'warning'}/>
                    break;
                case 2:
                    control = <Radio color={'error'}/>
                    break;
                default:
                    return <Radio color={'primary'}/>
            }
                return (
                    <FormControlLabel
                        value={option}
                        control={control}
                        label={option}
                        labelPlacement="top"
                    />
                )})}
    </RadioGroup>)
}
