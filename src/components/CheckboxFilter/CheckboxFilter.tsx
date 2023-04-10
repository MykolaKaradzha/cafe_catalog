import {
    FormControlLabel,
    Checkbox,
    FormGroup, IconButton
} from '@mui/material';
import React, {MutableRefObject, RefObject} from 'react';
import {FormValues, option} from '../FilterForm';
import {Control, Controller} from "react-hook-form";


type Props = {
    options: option[];
    control: Control<FormValues>;

}

export const CheckboxFilter: React.FC<Props> = ({options, control}) => {

    return (
        <FormGroup row>
            {options.map((option, index) => {
                let controlForLabel: any;
                switch (index) {
                    case 0:
                        controlForLabel = (
                            <Controller
                                render={({field}) => (
                                    <Checkbox
                                        color={'success'}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        checked={field.value}
                                    />
                                )}
                                name={option}
                                control={control}
                            />
                        )
                        break;
                    case 1:
                        controlForLabel = (
                            <Controller
                                render={({field}) => (
                                    <Checkbox
                                        color={'warning'}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        checked={field.value}
                                    />
                                )}
                                name={option}
                                control={control}
                            />
                        )
                        break;
                    case 2:
                        controlForLabel = (
                            <Controller
                                render={({field}) => (
                                    <Checkbox
                                        color={'error'}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        checked={field.value}
                                    />
                                )}
                                name={option}
                                control={control}
                            />
                        )
                        break;
                    default:
                        return <Checkbox color={'primary'}/>
                }
                return (

                <FormControlLabel
                    key={option}
                    value={true}
                    control={controlForLabel}
                    label={option}
                    labelPlacement="top"
                />
                )
            })}
        </FormGroup>)
}
