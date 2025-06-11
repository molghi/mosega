const fetchMovie = async (API_KEY: string, movieId: number) => {
    try {
        const API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
        const API_URL_SCREENSHOTS = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}`;
        const API_URL_CAST = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;
        const API_URL_VIDEOS = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`;

        const resp = await Promise.all([fetch(API_URL), fetch(API_URL_SCREENSHOTS), fetch(API_URL_CAST), fetch(API_URL_VIDEOS)]);

        if (!resp.map((x) => x.ok).every((x) => x)) {
            console.log("Fetching movie info failed");
            throw new Error("Fetching movie info failed");
        }

        // const resp2 = await Promise.all([resp[0].json(), resp[1].json(), resp[2].json(), resp[3].json()]);
        const resp2 = await Promise.all(resp.map((x) => x.json()));

        return { ...resp2[0], screenshots: resp2[1], cast: resp2[2], videos: resp2[3] };
    } catch (error) {
        console.error(error);
    }
};

export default fetchMovie;
