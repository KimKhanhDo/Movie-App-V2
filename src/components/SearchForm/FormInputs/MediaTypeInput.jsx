function MediaTypeInput({ onChange, name, value }) {
    return (
        <div className="accent-black">
            <input
                id="sf-type-movie"
                className="mr-1"
                type="radio"
                name={name}
                value="movie"
                checked={value === "movie"}
                onChange={onChange}
            />
            <label htmlFor="sf-type-movie">Movie</label>
            <br />
            <input
                id="sf-type-tv"
                className="mr-1"
                type="radio"
                name={name}
                value="tv"
                checked={value === "tv"}
                onChange={onChange}
            />
            <label htmlFor="sf-type-tv">TV Show</label>
        </div>
    );
}
export default MediaTypeInput;
