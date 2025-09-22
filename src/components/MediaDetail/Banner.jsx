import { groupBy } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import CircularProgressBar from "../CircularProgressBar";
import ImageComponent from "@/Image";
import { useModalContext } from "@/context/ModalProvider";

function Banner({
    title,
    backdropPath,
    posterPath,
    certification,
    crews,
    genres,
    releaseDate,
    point = 0,
    overview,
    trailerVideoKey,
}) {
    const { openPopUp } = useModalContext();

    if (!title) return null;

    // using Lodash
    const groupedCrews = groupBy(crews, "job");

    return (
        <div>
            <div className="relative overflow-hidden bg-black text-white shadow-sm shadow-slate-800">
                <ImageComponent
                    className="absolute inset-0 aspect-video w-full brightness-[.2]"
                    src={
                        backdropPath &&
                        `https://image.tmdb.org/t/p/original${backdropPath}`
                    }
                    alt={title}
                    width={1200}
                    height={800}
                />
                <div className="relative mx-auto flex max-w-screen-xl gap-6 px-6 py-10 lg:gap-8">
                    {/* Poster */}
                    <div className="flex-1">
                        <ImageComponent
                            src={
                                posterPath &&
                                `https://image.tmdb.org/t/p/w600_and_h900_bestv2${posterPath}`
                            }
                            alt={title}
                            width={600}
                            height={900}
                        />
                    </div>

                    {/* Movie Info */}
                    <div className="flex-[2] text-[1.2vw]">
                        <p className="mb-2 text-[2vw] font-bold">{title}</p>

                        {/* Certification, Release Date & Genres */}
                        <div className="flex items-center gap-4">
                            <span className="border border-gray-400 p-1 text-gray-400">
                                {certification}
                            </span>
                            <p>{releaseDate}</p>
                            <p>
                                {(genres || [])
                                    .map((genre) => genre.name)
                                    .join(", ")}
                            </p>
                        </div>

                        {/* Rating & Trailer */}
                        <div className="mt-4 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <CircularProgressBar
                                    percent={Math.round((point || 0) * 10)}
                                    strokeColor={
                                        point >= 7
                                            ? "green"
                                            : point >= 5
                                              ? "orange"
                                              : "red"
                                    }
                                    size={3.5}
                                    strokeWidth={0.3}
                                />
                                Rating
                            </div>
                            <button
                                className="cursor-pointer"
                                onClick={() =>
                                    openPopUp(
                                        <iframe
                                            title="Trailer"
                                            src={`https://www.youtube.com/embed/${trailerVideoKey}`}
                                            className="aspect-video w-[50vw]"
                                        />,
                                    )
                                }
                            >
                                <FontAwesomeIcon
                                    icon={faPlay}
                                    className="mr-1"
                                />
                                Trailer
                            </button>
                        </div>

                        {/* Overview */}
                        <div className="mt-4">
                            <p className="mb-2 text-[1.3vw] font-bold">
                                Overview
                            </p>
                            <p>{overview}</p>
                        </div>

                        {/* Director & Writer */}
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            {Object.keys(groupedCrews).map((job) => (
                                <div key={job}>
                                    <p className="font-bold">{job}</p>
                                    <p>
                                        {groupedCrews[job]
                                            .map((crew) => crew.name)
                                            .join(", ")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
