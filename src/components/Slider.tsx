import { ReactNode, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import SwiperCore, { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = ({ children }: { children: ReactNode }) => {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <div className="relative">
            {/* CUSTOM BUTTONS */}
            {/* LEFT ARROW */}
            <button
                className="absolute right-[80px] top-[-66px] text-4xl text-black transition hover:opacity-40 duration-200"
                onClick={() => swiperRef.current?.slidePrev()}
            >
                &#8592;
            </button>
            {/* RIGHT ARROW */}
            <button
                className="absolute right-[10px] top-[-66px] text-4xl text-black transition hover:opacity-40 duration-200"
                onClick={() => swiperRef.current?.slideNext()}
            >
                &#8594;
            </button>

            {/* SLIDER */}
            <Swiper
                onSwiper={(swiper: any) => {
                    swiperRef.current = swiper;
                }}
                loop={true}
                ref={swiperRef}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={4}
                pagination={{ clickable: true }}
                className="mb-10"
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    600: {
                        slidesPerView: 2,
                    },
                    800: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
            >
                {children}
            </Swiper>
        </div>
    );
};

export default Slider;
