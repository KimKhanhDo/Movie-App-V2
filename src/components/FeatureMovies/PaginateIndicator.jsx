import clsx from "clsx";

function PaginateIndicator({ movies, activeMovieId, setActiveMovieId }) {
    // useEffect(() => {
    //     if (!movies?.length) return;

    //     const timeId = setTimeout(() => {
    //         const currentIndex = movies.findIndex(
    //             (movie) => movie.id === activeMovieId,
    //         );

    //         const nextIndex = (currentIndex + 1) % movies.length;
    //         setActiveMovieId(movies[nextIndex].id);
    //     }, 5000);

    //     return () => clearTimeout(timeId);
    // }, [movies, activeMovieId, setActiveMovieId]);

    return (
        <div className="absolute right-8 bottom-[10%]">
            <ul className="flex gap-1">
                {movies.map((movie) => (
                    <li
                        key={movie.id}
                        className={clsx("h-1 w-6 cursor-pointer", {
                            "bg-slate-100": movie.id === activeMovieId,
                            "bg-slate-600": movie.id !== activeMovieId,
                        })}
                        onClick={() => setActiveMovieId(movie.id)}
                    ></li>
                ))}
            </ul>
        </div>
    );
}

export default PaginateIndicator;
