import { IMovie } from "../types/movie";
import "../styles/Movie.css";
import { forwardRef } from "react";

export default forwardRef<
    HTMLDivElement,
    {
        movie: IMovie;
        addToFavourites: (id: number) => void;
        removeFromFavourites: (id: number) => void;
        isFavourite?: boolean;
    }
>(function MovieCard(props, ref) {
    const {
        movie,
        isFavourite = false,
        addToFavourites,
        removeFromFavourites,
    } = props;
    return (
        <div
            onClick={() =>
                isFavourite
                    ? removeFromFavourites(movie.id)
                    : addToFavourites(movie.id)
            }
            ref={ref}
            className={`movie-item ${isFavourite ? "favourite-item" : ""}`}
        >
            <div className="movie-poster">
                <img
                    className="poster-img"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="img poster"
                />
            </div>
            <div className="movie-detail">
                <h3 className="movie-name">{movie.title}</h3>
                <div className="movie-info">
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                    <span>{movie.vote_average}</span>
                </div>
            </div>
        </div>
    );
});
