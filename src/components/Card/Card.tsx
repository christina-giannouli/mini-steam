import { Link } from 'react-router-dom';
import { App } from '../../types';

import PlatformIcons from '../PlatformIcons/PlatformIcons';

import './Card.scss';
import PriceButton from '../PriceButton/PriceButton';
import React from 'react';

const Card = ({
  _id: id,
  name,
  price_overview: price,
  platforms,
  header_image: img,
}: Partial<App>): JSX.Element => {
  return (
    <div className="game-card rounded-4">
      <img src={img} className="img-fluid rounded-4" alt="" />
      {platforms && (
        <div className="platform-icons-wrapper">
          <PlatformIcons
            mac={platforms?.mac}
            linux={platforms?.linux}
            windows={platforms?.windows}
          />
        </div>
      )}
      {price && (
        <div className="price-wrapper">
          <PriceButton
            showIcon={false}
            discount={price.discount_percent}
            initPrice={price.initial_formatted}
            finalPrice={price.final_formatted}
          />
        </div>
      )}
      <Link to={`/app/${id}/${name}`} className="stretched-link"></Link>
    </div>
  );
};
export default Card;
