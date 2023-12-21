import { useMemo } from 'react';
import Slider, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface sliderProps {
  children: React.ReactNode;
  autoplay?: boolean | number;
  speed?: number;
  loop?: boolean;
}

const BannerSlick = ({
  children,
  autoplay = true,
  speed = 600,
  loop = true,
}: sliderProps) => {
  const settings = useMemo<Settings>(
    () => ({
      // dots: true,
      // arrow: true,

      infinite: loop,
      speed: speed,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: Boolean(autoplay),
      autoplaySpeed: typeof autoplay === 'boolean' ? 3000 : autoplay,
      responsive: [],
    }),
    [autoplay, loop, speed],
  );
  return <Slider {...settings}>{children}</Slider>;
};

export default BannerSlick;
