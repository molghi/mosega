const fetchGame = async (API_KEY: string, gameSlug: string) => {
    try {
        const API_URL = `https://api.rawg.io/api/games/${gameSlug}?key=${API_KEY}`;
        const API_URL_SCREENSHOTS = `https://api.rawg.io/api/games/${gameSlug}/screenshots?key=${API_KEY}`;

        const resp = await fetch(API_URL);
        if (!resp.ok) throw new Error("Fetching game failed");

        const resp2 = await fetch(API_URL_SCREENSHOTS);
        if (!resp.ok) throw new Error("Fetching screenshots failed");

        const data = await resp.json();
        const data2 = await resp2.json();

        return { ...data, ...data2 };
    } catch (error) {
        console.error(error);
    }
};

export default fetchGame;
