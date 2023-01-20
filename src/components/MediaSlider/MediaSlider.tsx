import { useState } from 'react';

import './MediaSlider.scss';

const MediaSlider = ({
  slides,
}: {
  slides: { image: string; video: string }[];
}): JSX.Element | null => {
  const [activeSlide, setActiveSlide] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setActiveSlide(activeSlide === length - 1 ? 0 : activeSlide + 1);
  };

  const prevSlide = () => {
    setActiveSlide(activeSlide === 0 ? length - 1 : activeSlide - 1);
  };

  if (length === 0) {
    return null;
  }

  return (
    <section className="slider position-relative d-flex justify-content-center align-items-center">
      <span
        className="left arrow rounded-circle d-flex justify-content-center align-items-center"
        onClick={prevSlide}>
        <i className="bi bi-chevron-left"></i>
      </span>
      <span
        className="right arrow rounded-circle d-flex justify-content-center align-items-center"
        onClick={nextSlide}>
        <i className="bi bi-chevron-right"></i>
      </span>
      {slides.map((slide: { image: string; video: string }, index: number) => (
        <div className={index === activeSlide ? 'slide active' : 'slide'} key={index}>
          {index === activeSlide && (
            <>
              {slide.image ? (
                <img
                  src={slide.image}
                  alt="game screenshot"
                  className="img-fluid rounded-4 shadow-lg"
                />
              ) : (
                <video className="img-fluid rounded-4 shadow-lg" autoPlay loop muted>
                  <source src={slide.video} type="video/mp4" />
                </video>
              )}
            </>
          )}
        </div>
      ))}
    </section>
  );
};
export default MediaSlider;
