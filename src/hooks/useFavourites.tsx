import { useEffect, useState } from "react";

export default function useFavourites() {
    const [favourites, setFavourites] = useState<number[]>(
        JSON.parse(localStorage.getItem("favourites") ?? "[]") ?? [],
    );

    const addToFavourites = (id: number) => {
        setFavourites([...favourites, id]);
    };

    const removeFromFavourites = (id: number) => {
        setFavourites([...favourites.filter((f) => f !== id)]);
    };

    useEffect(() => {
        const currentFavourites = localStorage.getItem("favourites");
        if (currentFavourites && currentFavourites.length > 0)
            setFavourites(JSON.parse(currentFavourites));
    }, []);

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }, [favourites]);

    return { favourites, addToFavourites, removeFromFavourites };
}
