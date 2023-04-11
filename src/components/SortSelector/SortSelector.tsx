import * as React from 'react';
import {
    FormControl,
    InputLabel,
    ListSubheader,
    MenuItem,
    Select,
    SelectChangeEvent
} from '@mui/material';
import {useCafe} from '../../hooks/useCafe';

export const SortSelector = () => {
    const {sortOption, setSortOption} = useCafe();

    const handleChange = (event: SelectChangeEvent) => {
        setSortOption(event.target.value);
    };


    return (
        <FormControl
            variant="outlined"
            size="small"
            sx={{
                width: '30%',
                my: 3,
                alignSelf: 'flex-end'
            }}
        >
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
                labelId="sorter"
                id="sorter"
                value={sortOption}
                label="Sort"
                onChange={handleChange}
            >
                <MenuItem value={'none'}>
                    <em>None</em>
                </MenuItem>
                <ListSubheader>Price</ListSubheader>
                <MenuItem value={'priceLevel_DESC'}>From higher to lower
                    price
                </MenuItem>
                <MenuItem value={'priceLevel_ASC'}>From lower to higher
                    price
                </MenuItem>
                <ListSubheader>Noise</ListSubheader>
                <MenuItem value={'noiseLevel_DESC'}>From higher to lower
                    noise
                </MenuItem>
                <MenuItem value={'noiseLevel_ASC'}>From lower to higher
                    noise
                </MenuItem>
                <ListSubheader>Rating</ListSubheader>
                <MenuItem value={'rating_DESC'}>From higher to lower
                    rating
                </MenuItem>
                <MenuItem value={'rating_ASC'}>From lower to higher
                    rating
                </MenuItem>
            </Select>
        </FormControl>
    );
}
