const fetchPopularMoviesSeries = async (API_KEY: string) => {
    try {
        const yearNow = new Date().getFullYear();
        const monthNow = String(new Date().getMonth() + 1).padStart(2, "0");

        const movies = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&primary_release_date.gte=${yearNow}-${monthNow}-01&primary_release_date.lte=${yearNow}-${monthNow}-30&api_key=${API_KEY}`;
        const series = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&first_air_date.gte=${yearNow}-${monthNow}-01&first_air_date.lte=${yearNow}-${monthNow}-30&api_key=${API_KEY}`;

        const resp = await Promise.all([fetch(movies), fetch(series)]);
        const resp2 = await Promise.all([resp[0].json(), resp[1].json()]);

        return { movies: resp2[0], series: resp2[1] };
    } catch (error) {
        console.error(error);
    }
};

export default fetchPopularMoviesSeries;
