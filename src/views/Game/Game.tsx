import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DOMPurify from 'dompurify';

import Api from '../../api';
import { App } from '../../types';

import MediaSlider from '../../components/MediaSlider/MediaSlider';
import Notification from '../../components/Notification/Notification';
import Loader from '../../components/Loader/Loader';
import PriceButton from '../../components/PriceButton/PriceButton';

import './Game.scss';
import PlatformIcons from '../../components/PlatformIcons/PlatformIcons';

const Game = (): JSX.Element => {
  const [content, setContent] = useState<Partial<App>>({});
  const [slides, setSlides] = useState<Array<{ image: string; video: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationType, setNotificationType] = useState<'danger' | 'info' | 'success'>(
    'success',
  );
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const goBack = () => {
    navigate(-1);
  };

  const fetchApp = async (): Promise<void> => {
    try {
      const response: App[] = await Api.getAppById(id);
      const [
        {
          name,
          background,
          header_image,
          about_the_game,
          developers,
          publishers,
          price_overview,
          platforms,
          categories,
          short_description,
          screenshots,
          movies,
        },
      ] = response;
      setContent({
        name,
        background,
        header_image,
        about_the_game,
        developers,
        publishers,
        price_overview,
        platforms,
        categories,
        short_description,
        screenshots,
        movies,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        setNotificationType('danger');
      }
    } finally {
      createSliderMedia();
      setIsLoading(false);
    }
  };
  const createSliderMedia = (): void => {
    const { movies, screenshots } = content;
    const videos = movies?.map((movie) => ({ video: movie.mp4.max, image: '' })) || null;
    const images = screenshots?.map((img) => ({ image: img.path_full, video: '' })) || null;

    if (images && videos) {
      setSlides([...videos, ...images]);
    }
  };

  useEffect(() => {
    fetchApp();
  }, [isLoading]);

  return (
    <div className="game">
      {error && (
        <div className="container pt-5">
          <div className="row justify-content-center">
            <div className="col">
              <Notification message={error} type={notificationType} />
            </div>
          </div>
        </div>
      )}

      {isLoading || slides.length === 0 ? (
        <Loader />
      ) : (
        <>
          {/*Game Header*/}
          <div className="game-header" style={{ backgroundImage: `url(${content?.background})` }}>
            <div className="container pt-5">
              {/*Title and Buy Button*/}
              <div className="row">
                <div className="col">
                  <button className="p-0 mb-4 btn" id="go-back" onClick={goBack}>
                    <i className="bi bi-arrow-left"></i>
                    <span className="mx-2">Go back</span>
                  </button>
                  <div className="row row-cols-1 row-cols-md-2 justify-content-between align-items-center">
                    <div className="col col-md-9">
                      <h1 className="game-title m-0">{content.name}</h1>
                    </div>
                    <div className="col-11 col-sm-4 col-md-3 mt-3 mt-md-0">
                      {content.price_overview && (
                        <PriceButton
                          showIcon={true}
                          discount={content.price_overview?.discount_percent}
                          initPrice={content.price_overview?.initial_formatted}
                          finalPrice={content.price_overview?.final_formatted}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/*Short Description Box*/}
              <div className="row row-cols-1 row-cols-md-2 mt-5 py-5 px-3 gx-5 desc">
                <div className="col col-lg-5">
                  <img
                    className="img-fluid rounded-4 mb-5 mb-md-0"
                    src={content.header_image}
                    alt={content.name}
                  />
                </div>
                <div className="col col-lg-7">
                  <p dangerouslySetInnerHTML={{ __html: content.short_description as string }} />
                  <div className="meta mb-2">
                    <span className="text-uppercase">Developer:</span>
                    <span>{content.developers}</span>
                  </div>
                  <div className="meta">
                    <span className="text-uppercase">Publisher:</span>
                    <span>{content.publishers}</span>
                  </div>
                  <div className="mt-3">
                    {content.platforms && (
                      <PlatformIcons
                        mac={content.platforms?.mac}
                        linux={content.platforms?.linux}
                        windows={content.platforms?.windows}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Game Relative Section*/}
          <div className="container">
            <div className="row my-5 py-4">
              <h2 className="text-center mb-5 section-title">Is this game relevant to you?</h2>
              <>
                {content.categories?.map((cat) => (
                  <div key={cat.id} className="col-12 col-sm-6 col-md-4 col-lg-3 offset-lg-1 pb-2">
                    <div id="category">
                      <i className="bi bi-check2-circle me-2"></i>
                      {cat.description}
                    </div>
                  </div>
                ))}
              </>
            </div>
          </div>
          {/*  Slider Section */}
          <div className="slider-wrapper">
            <div className="container p-5">
              <div className="row justify-content-center ">
                <div className="col col-md-10">
                  <MediaSlider slides={slides} />
                </div>
              </div>
            </div>
          </div>
          {/*  About The Game section*/}
          <div className="container">
            <div className="row my-5 py-4">
              <div className="col">
                <h2 className="text-center mb-5 section-title">About the game</h2>
                <div
                  className="about"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(content.about_the_game as string),
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Game;
