const fetchCastCrew = async (API_KEY: string, personId: string) => {
    try {
        const generalInfo = `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}`;
        const projectsInvolved = `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${API_KEY}`;

        const resp = await fetch(generalInfo);
        const resp2 = await fetch(projectsInvolved);

        if (!resp.ok) throw new Error("Error fetching person data");
        if (!resp2.ok) throw new Error("Error fetching person data (2)");

        const data = await resp.json();
        const data2 = await resp2.json();

        return { ...data, ...data2 };
    } catch (error) {
        console.error(error);
    }
};

export default fetchCastCrew;
