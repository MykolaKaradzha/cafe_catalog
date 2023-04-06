import * as React from 'react';
import {
    FormControl,
    InputLabel,
    ListSubheader,
    MenuItem,
    Select,
    SelectChangeEvent
} from '@mui/material';
import {fetchData} from '../../utils/fetchClient';
import {OPTIONS, ORDER, SORTED_BY} from '../../constants';
import {useContext, useEffect} from 'react';
import {CafeContext} from '../../context/CafeContext';

export const SortSelector = () => {
    const {setCafes} = useContext(CafeContext);
    const [sortOption, setSortOption] = React.useState('');
    let sortingLink: string;

    switch (sortOption) {
        case 'priceDesc':
            sortingLink = SORTED_BY(OPTIONS.PRICE_LEVEL, ORDER.DESC);
            break;
        case 'priceAsc':
            sortingLink = SORTED_BY(OPTIONS.PRICE_LEVEL, ORDER.ASC);
            break;
        case 'noiseDesc':
            sortingLink = SORTED_BY(OPTIONS.NOISE_LEVEL, ORDER.DESC);
            break;
        case 'noiseAsc':
            sortingLink = SORTED_BY(OPTIONS.NOISE_LEVEL, ORDER.ASC);
            break;
        case 'ratingDesc':
            sortingLink = SORTED_BY(OPTIONS.RATING, ORDER.DESC);
            break;
        case 'ratingAsc':
            sortingLink = SORTED_BY(OPTIONS.RATING, ORDER.ASC);
            break;
        case 'none':
        default:
            sortingLink = SORTED_BY(OPTIONS.ID, ORDER.ASC);
            break;
    }



    const fetchSortedCafes = async () => {
        const { data: sortedCafes } = await fetchData(sortingLink)
        setCafes(sortedCafes);
    }

    const handleChange = (event: SelectChangeEvent) => {
        setSortOption(event.target.value);
    };

    useEffect(() => {
        fetchSortedCafes()
    }, [sortOption])

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
                <MenuItem value={'priceDesc'}>From higher to lower price</MenuItem>
                <MenuItem value={'priceAsc'}>From lower to higher price</MenuItem>
                <ListSubheader>Noise</ListSubheader>
                <MenuItem value={'noiseDesc'}>From higher to lower noise</MenuItem>
                <MenuItem value={'noiseAsc'}>From lower to higher noise</MenuItem>
                <ListSubheader>Rating</ListSubheader>
                <MenuItem value={'ratingDesc'}>From higher to lower rating</MenuItem>
                <MenuItem value={'ratingAsc'}>From lower to higher rating</MenuItem>
            </Select>
        </FormControl>
    );
}
