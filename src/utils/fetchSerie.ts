const fetchSerie = async (API_KEY: string, tvId: string) => {
    try {
        const API_URL = `https://api.themoviedb.org/3/tv/${tvId}?api_key=${API_KEY}`;
        const API_URL_SCREENSHOTS = `https://api.themoviedb.org/3/tv/${tvId}/images?api_key=${API_KEY}`;
        const API_URL_CAST = `https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=${API_KEY}`;
        const API_URL_EP_RUNTIME = `https://api.themoviedb.org/3/tv/${tvId}?api_key=${API_KEY}`;
        const API_URL_VIDEOS = `https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=${API_KEY}`;

        const resp = await Promise.all([
            fetch(API_URL),
            fetch(API_URL_SCREENSHOTS),
            fetch(API_URL_CAST),
            fetch(API_URL_EP_RUNTIME),
            fetch(API_URL_VIDEOS),
        ]);

        if (!resp.map((x) => x.ok).every((x) => x)) {
            console.log("Fetching serie info failed");
            throw new Error("Fetching serie info failed");
        }

        const resp2 = await Promise.all([resp[0].json(), resp[1].json(), resp[2].json(), resp[3].json(), resp[4].json()]);

        // Fetch episodes info
        const eps = Array.from(
            { length: resp2[0].number_of_seasons },
            (_, index) => `https://api.themoviedb.org/3/tv/${tvId}/season/${index + 1}?api_key=${API_KEY}`
        );
        const respEps = await Promise.all(eps.map((x) => fetch(x)));
        const epsData = await Promise.all(respEps.map((x) => x.json()));

        return {
            ...resp2[0],
            screenshots: resp2[1],
            cast: resp2[2],
            ep_runtime: resp2[3],
            videos: resp2[4],
            episodesData: epsData,
        };
    } catch (error) {
        console.error(error);
    }
};

export default fetchSerie;
