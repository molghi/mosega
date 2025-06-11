const fetchCastCrew = async (API_KEY: string, personId: string) => {
    try {
        const generalInfo = `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}`;
        const projectsInvolved = `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${API_KEY}`;

        const resp = await Promise.all([fetch(generalInfo), fetch(projectsInvolved)]);

        // if (!resp.ok) throw new Error("Error fetching person data");

        const resp2 = await Promise.all(resp.map((x) => x.json()));

        return { ...resp2 };
    } catch (error) {
        console.error(error);
    }
};

export default fetchCastCrew;
