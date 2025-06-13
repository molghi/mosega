const fetchByGenre = async (API_KEY: string, genreCode: string, type: string, page: number = 1) => {
    try {
        const url = `https://api.themoviedb.org/3/discover/${type}?with_genres=${genreCode}&sort_by=popularity.desc&api_key=${API_KEY}&page=${page}`;

        const resp = await fetch(url);

        if (!resp.ok) throw new Error("Error fetching by genre");

        const data = await resp.json();

        return { ...data, genre: genreCode };
    } catch (error) {
        console.error(error);
    }
};

export default fetchByGenre;
