const fetchGame = async (API_KEY: string, gameSlug: string) => {
    try {
        const API_URL = `https://api.rawg.io/api/games/${gameSlug}?key=${API_KEY}`;
        const API_URL_SCREENSHOTS = `https://api.rawg.io/api/games/${gameSlug}/screenshots?key=${API_KEY}`;

        const resp = await Promise.all([fetch(API_URL), fetch(API_URL_SCREENSHOTS)]);

        // if (!resp.ok) throw new Error("Fetching game failed");

        const resp2 = await Promise.all(resp.map((x) => x.json()));

        return { ...resp2[0], screenshots: resp2[1].results };
    } catch (error) {
        console.error(error);
    }
};

export default fetchGame;
