import { useParams } from "react-router-dom";

import useFetch from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import Banner from "@/components/MediaDetail/Banner";
import ActorList from "@/components/MediaDetail/ActorList";
import RelatedMediaList from "@/components/MediaDetail/RelatedMediaList";
import TVShowInformation from "@/components/MediaDetail/TVShowInformation";
import SeasonsList from "@/components/MediaDetail/SeasonsList";

function TVShowDetail() {
    const { id } = useParams();

    // fetch Movie Detail
    const { data: tvInfo, isLoading } = useFetch({
        url: `/tv/${id}?append_to_response=content_ratings,aggregate_credits,videos`,
    });
    console.log("🚀 ~ TVShowDetail ~ tvInfo:", tvInfo);

    // fetch Recommendations
    const {
        data: recommendationsResponse,
        isLoading: isRecommendationLoading,
    } = useFetch({
        url: `/tv/${id}/recommendations`,
    });

    const relatedTVShow = recommendationsResponse.results || [];

    const certification = (tvInfo.content_ratings?.results || []).find(
        (result) => result.iso_3166_1 === "US",
    )?.rating;

    // Nhóm job cần lấy
    const WANTED_JOBS = ["Director", "Writer"];

    // Lọc và rút gọn thông tin crew
    const crews = (tvInfo.aggregate_credits?.crew ?? [])
        // 1) Chỉ giữ những người có job thuộc nhóm cần
        .filter((crew) =>
            (crew.jobs ?? []).some((j) => WANTED_JOBS.includes(j.job)),
        )
        // lấy ra 10 người đầu tiên
        .slice(0, 10)
        // 2) Rút gọn thành object {id, name, job}
        .map((crew) => ({
            id: crew.id, // ID của crew
            name: crew.name, // Tên crew
            job: crew.jobs?.[0]?.job ?? "N/A", // Lấy job đầu tiên (nếu có)
        }));

    if (isLoading) return <Loading />;

    return (
        <div>
            <Banner
                title={tvInfo.name}
                backdropPath={tvInfo.backdrop_path}
                posterPath={tvInfo.poster_path}
                releaseDate={tvInfo.first_air_date}
                genres={tvInfo.genres}
                point={tvInfo.vote_average}
                certification={certification}
                crews={crews}
                trailerVideoKey={
                    (tvInfo.videos?.results || []).find(
                        (video) => video.type === "Trailer",
                    )?.key
                }
            />
            <div className="bg-black text-[1.2vw] text-white">
                <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10 sm:gap-8">
                    <div className="flex-[2]">
                        <ActorList
                            actors={(tvInfo.aggregate_credits?.cast || []).map(
                                (cast) => ({
                                    ...cast,
                                    character: cast.roles[0]?.character,
                                    episodeCount: cast.roles[0]?.episode_count,
                                }),
                            )}
                        />

                        <SeasonsList
                            seasons={(tvInfo.seasons || []).reverse()}
                        />

                        <RelatedMediaList
                            mediaList={relatedTVShow}
                            isLoading={isRecommendationLoading}
                        />
                    </div>
                    <div className="flex-1">
                        <TVShowInformation tvInfo={tvInfo} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TVShowDetail;
