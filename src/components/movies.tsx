import { useCallback, useRef, useState } from "react";
import useFavourites from "../hooks/useFavourites";
import useMovies from "../hooks/useMovies";
import MovieCard from "./movieCard";

export default function Movies() {
    const [page, setPage] = useState(1);
    const { loading, error, movies, hasMore } = useMovies(page);
    const { addToFavourites, favourites, removeFromFavourites } =
        useFavourites();
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
        <>
            <div className="movie-list">
                {movies.map((movie, index) => {
                    if (index === movies.length - 1)
                        return (
                            <MovieCard
                                isFavourite={favourites.includes(movie.id)}
                                addToFavourites={addToFavourites}
                                removeFromFavourites={removeFromFavourites}
                                ref={lastMovie}
                                key={movie.id}
                                movie={movie}
                            />
                        );
                    return (
                        <MovieCard
                            isFavourite={favourites.includes(movie.id)}
                            addToFavourites={addToFavourites}
                            removeFromFavourites={removeFromFavourites}
                            key={movie.id}
                            movie={movie}
                        />
                    );
                })}
                <button onClick={() => setPage(page + 1)}>Load more</button>
                {loading && <p>loading</p>}
            </div>
        </>
    );
}
