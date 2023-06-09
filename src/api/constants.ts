import {FormValues} from '../components/FilterForm';

export const BASE_URL = `https://cafe-catalog.site/api`;

export const CAFES_URL = `${BASE_URL}/cafe`;

export const MY_LIST_URL = `${BASE_URL}/cabinet`;

export const REGISTER_URL = '/auth/register';

export const LOGIN_URL = '/auth/login';


export const CAFE = (id: string) => `${CAFES_URL}/${id}`;

export const SORTED_BY = (
    optionOrder: string,
    pageNumber: number = 0,
) => {
    if (!optionOrder || optionOrder === 'none' ) {
        return `?sortBy=id:ASC&page=${pageNumber}`
    }
    const [option, order] = optionOrder.split('_');

    return `?sortBy=${option}:${order}&page=${pageNumber}`
}

export const FILTERED = (filterData : FormValues) => {
    let options = ['alcohol','event%20room','vegan'];
    let noise = ['low','middle','high'];
    let price = ['$', '$$', '$$$'];
    let ratingBlock = '';
    let minOrderBlock = '';

    for (const [key, value] of Object.entries(filterData)) {
        if (!value) {
            switch (true) {
                case options.includes(key):
                    options = options.filter(option => option !== key)
                    break;

                case noise.includes(key):
                    noise = noise.filter(option => option !== key)
                    break;

                case price.includes(key):
                    price = price.filter(option => option !== key)
                    break;
            }
        }

        if (key === 'rating') {
            ratingBlock=value ? `rating=${value}` : ''
        }

        if (key === 'minOrder' && Array.isArray(value)) {
            if (value[0] === value[1] && value[0] !== 0) {
                minOrderBlock = `minOrder=${value[0]}-`
            } else {
                minOrderBlock = value[1] ? `minOrder=${value[0]}-${value[1]}` : '';
            }
        }

        if (value === 'no') {
            const index = options.indexOf(key);
            options[index] += ':no';
        }
    }

    const optionsBlock = options.length
        ? `option=${options.join(',')}`
        : '';
    const noiseBlock = noise.length
        ? `noise=${noise.join(',')}`
        : '';
    const priceBlock = price.length
        ? `priceLevel=${price.join(',')}`
        : '';

    return `&${optionsBlock}&${noiseBlock}&${priceBlock}&${minOrderBlock}&${ratingBlock}`;

}
