import { useEffect, useState } from "react";
import { getMovies } from "../api/movies";
import { IMovie } from "../types/movie";

export default function useMovies(page: number) {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        getMovies({ page })
            .then((data) => {
                setMovies((prevMovies) => [...prevMovies, ...data.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
    }, [page]);

    return {
        error,
        movies,
        loading,
    };
}
