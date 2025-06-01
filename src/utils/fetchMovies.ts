const fetchMovies = async (API_KEY: string, query: string) => {
    try {
        const API_URL: string = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

        const resp = await fetch(API_URL);

        if (!resp.ok) throw new Error("Fetching movies failed");

        const data = await resp.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};

export default fetchMovies;
