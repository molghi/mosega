const fetchSerie = async (API_KEY: string, tvId: string) => {
    try {
        const API_URL = `https://api.themoviedb.org/3/tv/${tvId}?api_key=${API_KEY}`;
        const API_URL_SCREENSHOTS = `https://api.themoviedb.org/3/tv/${tvId}/images?api_key=${API_KEY}`;

        const resp = await fetch(API_URL);
        const resp2 = await fetch(API_URL_SCREENSHOTS);

        if (!resp.ok) throw new Error("Fetching serie failed");
        if (!resp2.ok) throw new Error("Fetching serie screenshots failed");

        const data = await resp.json();
        const data2 = await resp2.json();

        return { ...data, screenshots: data2 };
    } catch (error) {
        console.error(error);
    }
};

export default fetchSerie;
