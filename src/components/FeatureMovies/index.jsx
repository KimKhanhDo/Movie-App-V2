import Movie from "./Movie";
import PaginateIndicator from "./PaginateIndicator";

export default function FeatureMovies() {
  return (
    <div className="relative text-white">
      <Movie />
      <PaginateIndicator />
    </div>
  );
}
