import { useMemo } from "react";
import Slider, { Settings } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface sliderProps {
  children: React.ReactNode;
  autoplay?: boolean | number;
  speed?: number;
  loop?: boolean;
}

const Slick = ({
  children,
  autoplay = false,
  speed = 300,
  loop = false,
}: sliderProps) => {
  const settings = useMemo<Settings>(
    () => ({
      // dots: true,
      // arrow: true,

      infinite: loop,
      speed: speed,
      slidesToShow: 3.2,
      slidesToScroll: 1,
      autoplay: Boolean(autoplay),
      autoplaySpeed: typeof autoplay === "boolean" ? 3000 : autoplay,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2.2,
            slidesToScroll: 3,
          },
        },
      ],
    }),
    [autoplay, loop, speed],
  );
  return <Slider {...settings}>{children}</Slider>;
};

export default Slick;
