import { IMovie } from "../types/movie";
import "../styles/Movie.css";
import { forwardRef } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

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

    const generateTMDBUrl = (m: IMovie) => {
        return `https://www.themoviedb.org/movie/${
            m.id
        }-${m.original_title?.replace(" ", "-")}`;
    };

    return (
        <div
            ref={ref}
            className={`movie-item ${isFavourite ? "favourite-item" : ""}`}
        >
            <div
                onClick={() => window.open(generateTMDBUrl(movie))}
                className="movie-poster"
            >
                <img
                    className="poster-img"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="img poster"
                />
            </div>
            <div
                onClick={() => window.open(generateTMDBUrl(movie))}
                className="movie-detail"
            >
                <h3 className="movie-name">{movie.title}</h3>
                <div className="movie-info">
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                    <span>{movie.vote_average}</span>
                </div>
            </div>
            <div
                onClick={() =>
                    isFavourite
                        ? removeFromFavourites(movie.id)
                        : addToFavourites(movie.id)
                }
                className="favourite-btn"
            >
                {isFavourite ? (
                    <AiFillStar color="#FFCA28" size={30} />
                ) : (
                    <AiOutlineStar color="#666666" size={30} />
                )}
            </div>
        </div>
    );
});
