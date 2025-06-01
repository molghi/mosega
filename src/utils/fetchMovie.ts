const fetchMovie = async (API_KEY: string, movieId: number) => {
    try {
        const API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
        const API_URL_SCREENSHOTS = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}`;

        const resp = await fetch(API_URL);
        const resp2 = await fetch(API_URL_SCREENSHOTS);

        if (!resp.ok) throw new Error("Fetching movie failed");
        if (!resp2.ok) throw new Error("Fetching movie screenshots failed");

        const data = await resp.json();
        const data2 = await resp2.json();

        return { ...data, screenshots: data2 };
    } catch (error) {
        console.error(error);
    }
};

export default fetchMovie;
