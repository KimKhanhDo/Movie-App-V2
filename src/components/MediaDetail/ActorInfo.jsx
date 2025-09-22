import { Link } from "react-router-dom";
import ImageComponent from "@/Image";

function ActorInfo({ id, name, character, profilePath, episodeCount }) {
    return (
        <Link
            to={`/people/${id}`}
            className="rounded-lg border border-slate-300 bg-black shadow-sm"
        >
            <ImageComponent
                className="rounded-lg"
                src={
                    profilePath &&
                    `https://media.themoviedb.org/t/p/w276_and_h350_face${profilePath}`
                }
                alt={name}
                width={276}
                height={350}
            />
            <div className="p-3">
                <p className="font-bold">{name}</p>
                <p>{character}</p>
                {episodeCount && (
                    <p>
                        {episodeCount > 1
                            ? `${episodeCount} Episodes`
                            : `${episodeCount} Episode`}
                    </p>
                )}
            </div>
        </Link>
    );
}
export default ActorInfo;
