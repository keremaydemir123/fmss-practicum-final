import { Link } from 'react-router-dom';

import { Starship } from '../types';

interface ICard {
  starship: Starship;
}

function Card({ starship }: ICard) {
  return (
    <Link to={`/starship/${starship.id}`} className="card">
      <div className="flex-1">
        <img src="/starship.jpg" alt="starship" className="card__image" />
      </div>
      <h2 className="card__starship_name">{starship.name}</h2>
      <div className="card__body">
        <h3 className="card__body__title">Model</h3>
        <p className="card__body__value">{starship.model}</p>
        <hr className="my-2" />
        <h3 className="card__body__title">Hyperdrive Rating</h3>
        <p className="card__body__value">{starship.hyperdrive_rating}</p>
      </div>
    </Link>
  );
}

export default Card;
