/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Movie from "./Movie";
import PaginateIndicator from "./PaginateIndicator";
import useFetch from "@/hooks/useFetch";

function FeatureMovies() {
    const [activeMovieId, setActiveMovieId] = useState();

    const { data: popularMoviesResponse } = useFetch({
        url: "/movie/popular",
    });

    const movies = (popularMoviesResponse.results || []).slice(0, 4);

    // Sau khi React render xong UI → mới chạy useEffect
    // Trong useEffect gọi setActiveMovieId(movies[0].id) → React re-render một lần duy nhất.
    // 👉 Tại lần re-render tiếp theo, nếu movies không đổi thì JSON.stringify(movies) cũng không đổi → useEffect KHÔNG chạy lại → không có loop.
    useEffect(() => {
        if (movies[0]?.id) setActiveMovieId(movies[0].id);
    }, [JSON.stringify(movies)]);

    return (
        <div className="relative text-white">
            {movies
                .filter((movie) => movie.id === activeMovieId)
                .map((movie) => (
                    <Movie key={movie.id} data={movie} />
                ))}

            <PaginateIndicator
                movies={movies}
                activeMovieId={activeMovieId}
                setActiveMovieId={setActiveMovieId}
            />
        </div>
    );
}

export default FeatureMovies;
