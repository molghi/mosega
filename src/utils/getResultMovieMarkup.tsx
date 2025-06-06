const getResultMovieMarkup = (data: any, tmdbMovies: any) => {
    return (
        <>
            {/* POSTER */}
            <div
                className="bg-base-200 p-4 rounded shadow "
                // min-w-[215px] h-[325px]
                title={data.overview ? `Overview:\n${data.overview}` : ""}
            >
                {data.poster_path ? (
                    <img
                        className="w-[100%] h-[100%] object-cover bg-black"
                        src={"https://image.tmdb.org/t/p/original/" + data.poster_path}
                        alt="Poster"
                    />
                ) : (
                    <div className="h-full min-h-[100%] bg-black flex items-center justify-center italic">
                        No poster available
                    </div>
                )}
            </div>

            {/* TITLE */}
            {data.title && (
                <div className="bg-base-200 p-4 pb-1 rounded shadow text-xl font-bold" title={data.title}>
                    {data.title}
                </div>
            )}

            {/* RELEASE DATE */}
            {data.release_date && (
                <div className="bg-base-200 p-4 pb-1 pt-2 rounded shadow" title={`Released: ${data.release_date}`}>
                    <span className="font-bold">Released:</span> {data.release_date.split("-")[0]}
                </div>
            )}

            {/* GENRES */}
            {data.genre_ids && data.genre_ids.length > 0 && (
                <div className="bg-base-200 p-4 pb-1 pt-2 rounded shadow">
                    <span className="font-bold">Genres: </span>
                    {data.genre_ids.map((genreId: number) => tmdbMovies(genreId) || "Unknown").join(", ")}
                </div>
            )}

            {/* LANG */}
            {data.original_language && (
                <div className="bg-base-200 p-4 pb-1 pt-2 rounded shadow">
                    <span className="font-bold">Language: </span>
                    {data.original_language.toUpperCase()}
                </div>
            )}

            {/* RATING */}
            {data.vote_average ? (
                <div
                    className="bg-base-200 p-4 pt-2 rounded shadow"
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

export default getResultMovieMarkup;
