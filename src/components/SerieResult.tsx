import { tmdbMovies, tmdbSeries } from "../utils/genreInterpreter";

const SerieResult = ({ data }: { data: any }) => {
    return (
        <>
            {/* POSTER */}
            <div className="h-[40%] mb-3" title={data.overview ? `Overview:\n${data.overview}` : ""}>
                {data.poster_path ? (
                    <img
                        className="w-full h-full object-contain bg-black"
                        src={"https://image.tmdb.org/t/p/original/" + data.poster_path}
                        alt="Poster"
                    />
                ) : (
                    <div className="h-full bg-black flex items-center justify-center italic">No poster available</div>
                )}
            </div>

            {/* TITLE */}
            {data.name && (
                <div className="pb-1 text-xl font-bold line-clamp-2" title={data.name}>
                    {data.name}
                </div>
            )}

            {/* RELEASE DATE */}
            {data.first_air_date && (
                <div className="  pb-1 pt-2  " title={`First Aired: ${data.first_air_date}`}>
                    <span className="font-bold">First Aired:</span> {data.first_air_date.split("-")[0]}
                </div>
            )}

            {/* GENRES */}
            {data.genre_ids && data.genre_ids.length > 0 && (
                <div
                    className="  pb-1 pt-2 line-clamp-1 "
                    title={`Genres: ${data.genre_ids.map((genreId: number) => tmdbSeries(genreId) || "Unknown").join(", ")}`}
                >
                    <span className="font-bold">Genres: </span>
                    {data.genre_ids.map((genreId: number) => tmdbSeries(genreId) || "Unknown").join(", ")}
                </div>
            )}

            {/* LANGUAGE */}
            {data.original_language && (
                <div className="  pb-1 pt-2  ">
                    <span className="font-bold">Language: </span>
                    {data.original_language.toUpperCase()}
                </div>
            )}

            {/* RATING */}
            {data.vote_average ? (
                <div
                    className="  pt-2  "
                    title={`Average Rating: ${data.vote_average.toFixed(1)}/10\nVote Count: ${data.vote_count}`}
                >
                    <span className="font-bold">Average Rating: </span>
                    {data.vote_average.toFixed(1)} (
                    {data.vote_count < 1000 ? data.vote_count : data.vote_count.toString().slice(0, -3) + "K"})
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default SerieResult;
