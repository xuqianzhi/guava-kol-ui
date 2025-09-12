export interface Merchant {
    datetime: string;
    address: string;
    name: string;
    industry: string;
    email: string;
    description: string;
    id: string;
}

export interface GetMerchantsResponse {
    success: boolean;
    merchants: Merchant[];
    count: number;
    filtered: boolean;
}

export interface DishReview {
    name: string;
    rating: number;
    review: string;
}

export interface SocialMediaPostRequest {
    restaurant_name: string;
    dishes: DishReview[];
    dining_occasion: string;
    additional_context: string;
}

export interface SocialMediaPostResponse {
    success: boolean;
    social_media_post: string;
    character_count: number;
    hashtags: string[];
}

// API Base URL
export const API_BASE_URL = 'https://us-central1-guava-2dd45.cloudfunctions.net';

// Language constants
export enum Language {
    ENGLISH = 'en',
    CHINESE = 'zh'
}
