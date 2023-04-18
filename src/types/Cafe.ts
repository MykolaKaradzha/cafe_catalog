export interface Cafe {
    id:number,
    name: string,
    shortDescription: string,
    description: string,
    city: string,
    address: string,
    hours: string,
    priceLevel: string,
    minOrder: number,
    noiseLevel: string,
    tablesNumber: number,
    latitude: null,
    longitude: null,
    rating: null | number,
    instagramLink: string | null,
    facebookLink: string | null,
    websiteLink: string | null,
    imageLink: string[],
    optionNames: string[],
    logoLink: string,
    comments: Comment[],
    totalPages?: number,
    totalElements?: number
}

export type Comment = {
    "id": number,
    "text": string,
    "rating": number,
    "publicityDate": string,
    "cafeName": string,
    "username": string,
}



