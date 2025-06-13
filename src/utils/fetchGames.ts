const fetchGames = async (API_KEY: string, query: string, page: number = 1) => {
    try {
        const API_URL: string = `https://api.rawg.io/api/games?search=${encodeURIComponent(query)}&key=${API_KEY}&page=${page}`;

        const resp = await fetch(API_URL);

        if (!resp.ok) throw new Error("Fetching games failed");

        const data = await resp.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};

export default fetchGames;
