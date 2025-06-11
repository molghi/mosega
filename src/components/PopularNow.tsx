import { useContext } from "react";
import MyContext from "../context/MyContext";
import PopularItem from "./PopularItem";
import { SwiperSlide } from "swiper/react";
import Slider from "./Slider";

const PopularNow = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using Context"); // Null check
    const { popularNow, containerStyles } = context;

    return (
        <section data-name="Popular Now" className={`${containerStyles} pb-40`}>
            {/* BIG TITLE */}
            <div className="text-5xl font-bold mb-5">Popular This Month</div>

            {/* MOVIES BLOCK */}
            <div className="text-3xl font-bold mb-5 bg-success p-2 px-4 text-black">Movies</div>
            <Slider>
                {popularNow.movies.results.map((movie: any) => (
                    <SwiperSlide key={movie.id}>
                        <PopularItem type="movie" data={movie} />
                    </SwiperSlide>
                ))}
            </Slider>

            {/* SERIES BLOCK */}
            <div className="text-3xl font-bold mb-5 bg-success p-2 px-4 text-black">Series</div>
            <Slider>
                {popularNow.series.results.map((serie: any) => (
                    <SwiperSlide key={serie.id}>
                        <PopularItem type="serie" data={serie} />
                    </SwiperSlide>
                ))}
            </Slider>

            {/* GAMES BLOCK */}
            <div className="text-3xl font-bold mb-5 bg-success p-2 px-4 text-black">Games</div>
            <Slider>
                {popularNow.games.results.map((game: any) => (
                    <SwiperSlide key={game.id}>
                        <PopularItem type="game" data={game} />
                    </SwiperSlide>
                ))}
            </Slider>
        </section>
    );
};

export default PopularNow;
