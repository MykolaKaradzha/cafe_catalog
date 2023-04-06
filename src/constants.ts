
const BASE_URL = `http://cafe-env.eba-tqzcypxp.eu-west-3.elasticbeanstalk.com/api/cafe/`;

export const CAFES = (pageNumber: number = 0) =>
  `${BASE_URL}?page=${pageNumber}`;

export const CAFE = (id: string) => `${BASE_URL}${id}`;

export const SORTED_BY = (
    pageNumber: number = 0, option: string, order: string
) =>
    `${BASE_URL}?sortBy=${option}:${order}&page=${pageNumber}`

export enum SORT_OPTIONS {
    PRICE_LEVEL = 'priceLevel',
    RATING = 'rating',
    NOISE_LEVEL = 'noiseLevel',
    ID = 'id'
}

export enum ORDER {
    ASC = 'ASC',
    DESC = 'DESC',
}
