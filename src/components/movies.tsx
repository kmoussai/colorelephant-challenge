import { useCallback, useRef, useState } from "react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./movieCard";

export default function Movies() {
    const [page, setPage] = useState(1);
    const { loading, error, movies, hasMore } = useMovies(page);

    // Detect scrolling to fetch new elements
    const observer = useRef<IntersectionObserver>();
    const lastMovie = useCallback(
        (movieCard: HTMLDivElement) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (movieCard) observer.current.observe(movieCard);
        },
        [hasMore, loading],
    );
    if (loading) return <p>Loading</p>;
    if (error) return <p>fetch error</p>;

    return (
        <div className="movie-list">
            {movies.map((movie, index) => {
                if (index === movies.length - 1)
                    return (
                        <MovieCard
                            ref={lastMovie}
                            key={movie.id}
                            movie={movie}
                        />
                    );

                return <MovieCard key={movie.id} movie={movie} />;
            })}
        </div>
    );
}
