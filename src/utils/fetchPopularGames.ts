const fetchPopularGames = async (API_KEY: string) => {
    try {
        const yearNow = new Date().getFullYear();
        const monthNow = String(new Date().getMonth() + 1).padStart(2, "0");

        const url = `https://api.rawg.io/api/games?dates=${yearNow}-${monthNow}-01,${yearNow}-${monthNow}-30&ordering=-added&key=${API_KEY}`;

        const resp = await fetch(url);
        const resp2 = await resp.json();

        return { games: resp2 };
    } catch (error) {
        console.error(error);
    }
};

export default fetchPopularGames;
