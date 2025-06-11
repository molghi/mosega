import fetchCastCrew from "./fetchCastCrew";
import fetchByGenre from "./fetchByGenre";
import { tmdbMovies } from "./genreInterpreter";

// ========================================================================================

// Fetch person info
export const fetchPersonInfo = async (personId: string, setIsLoading: any, setPersonData: any, navigate: any) => {
    setIsLoading(true);
    const data: any = await fetchCastCrew(import.meta.env.VITE_TMDB_API_KEY, personId);
    setIsLoading(false);
    setPersonData(data);
    const nameSluggified = data[0].name.toLowerCase().replaceAll(" ", "-");
    navigate(`/personality/${nameSluggified}`);
};

// ========================================================================================

// Fetch by genre
export const fetchGenre = async (genreId: string, setIsLoading: any, setResults: any, navigate: any) => {
    setIsLoading(true);
    const data = await fetchByGenre(import.meta.env.VITE_TMDB_API_KEY, genreId, "movie");
    setIsLoading(false);
    setResults(data);
    const genreNameSluggified = tmdbMovies(+genreId).toLowerCase().replaceAll(" ", "-");
    navigate(`/genre/${genreNameSluggified}`);
};
