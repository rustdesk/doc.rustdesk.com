/* https://swiperjs.com/demos */

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Scrollbar, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Carousel = ({ list }) => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      style={{
        '--swiper-pagination-bullet-inactive-color': '#fff',
        '--swiper-pagination-bullet-inactive-opacity': 0.5,
        '--swiper-pagination-bullet-size': '12px',
      }}
      mousewheel={{ forceToAxis: true, sensitivity: 0.1, releaseOnEdges: true }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      // https://github.com/nolimits4web/swiper/blob/40a705e5bcadf2ee2ee90591ff9ed95c1aaf9026/src/swiper-element.mjs#L286
      // workaround for {true} which cause console error
      lazy='true'
      scrollbar
      modules={[Pagination, Autoplay, Scrollbar, Mousewheel]}
    >
      {list.map((item, i) => (
        <SwiperSlide key={'p' + i}>
          <img src={item.src} className={item.className} loading="lazy" alt={item.alt} />
          <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
