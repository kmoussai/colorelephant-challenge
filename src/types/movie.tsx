interface IMovie {
    id: number;
    adult: false;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface IApiResponse {
    page: number;
    results: IMovie[];
}

export type { IMovie, IApiResponse };
