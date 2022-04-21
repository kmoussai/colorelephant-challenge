import { useCallback, useRef, useState } from "react";
import useFavourites from "../hooks/useFavourites";
import useMovies from "../hooks/useMovies";
import MovieCard from "./movieCard";
import {
    HiOutlineSortAscending,
    HiOutlineSortDescending,
} from "react-icons/hi";
import { IMovie } from "../types/movie";
import { ASC, DEFAULT, DESC } from "../constants";

export default function Movies() {
    const [page, setPage] = useState(1);
    const { loading, error, movies, hasMore } = useMovies(page);
    const [sortOrder, setSortOrder] = useState<number>(DEFAULT);
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

    const handleSort = (a: IMovie, b: IMovie) => {
        if (sortOrder === DEFAULT) return 0;
        else if (sortOrder === ASC) return a.vote_average - b.vote_average;
        else return b.vote_average - a.vote_average;
    };

    return (
        <>
            <div
                style={{
                    height: "50px",
                    display: "flex",
                    justifyContent: "end",
                }}
            >
                <div onClick={() => setSortOrder((sortOrder + 1) % 3)}>
                    {sortOrder === ASC ? (
                        <HiOutlineSortAscending size={50} />
                    ) : (
                        <HiOutlineSortDescending size={50} />
                    )}
                </div>
            </div>
            <div className="movie-list">
                {movies.sort(handleSort).map((movie, index) => {
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
                {loading && <p>loading</p>}
            </div>
        </>
    );
}
