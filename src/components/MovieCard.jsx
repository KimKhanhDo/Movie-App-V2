import { Link } from "react-router-dom";
import CircularProgressBar from "@/components/CircularProgressBar";
import Image from "@/Image";

function MovieCard({ title, releaseDate, poster, point, mediaType, id }) {
    return (
        <Link
            to={mediaType === "tv" ? `/tv/${id}` : `/movie/${id}`}
            className="rounded-lg border border-slate-800"
        >
            <div className="relative">
                {mediaType === "tv" && (
                    <p className="absolute top-1 right-1 rounded bg-black p-1 text-sm font-bold text-white shadow-md">
                        TV Show
                    </p>
                )}
                <Image
                    src={`https://image.tmdb.org/t/p/w500${poster}`}
                    alt={title}
                    width={210}
                    height={300}
                    className="w-full rounded-lg"
                />

                <div className="relative -top-[1.5vw] px-4">
                    <CircularProgressBar
                        percent={Math.round(point * 10)}
                        strokeColor={
                            point >= 7 ? "green" : point >= 5 ? "orange" : "red"
                        }
                    />
                    <p className="mt-2 font-bold">{title}</p>
                    <p className="text-slate-300">{releaseDate}</p>
                </div>
            </div>
        </Link>
    );
}
export default MovieCard;
