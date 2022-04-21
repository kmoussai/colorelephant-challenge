import { handleFetchError } from "../helpers";
import { IApiResponse, IMovie } from "../types/movie";

interface IGetParams {
    page: number;
}
const API_URL = process.env.REACT_APP_API_URL;
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

async function getMovies(params: IGetParams): Promise<IApiResponse> {
    const { page } = params;
    return fetch(`${API_URL}/movie/top_rated?page=${page}`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        },
    })
        .then(handleFetchError)
        .then((res) => res.json());
}

export { getMovies };
