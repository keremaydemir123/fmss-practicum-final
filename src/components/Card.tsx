import { Link } from 'react-router-dom';

import { Starship } from '../types';

interface ICard {
  starship: Starship;
}

export function Card({ starship }: ICard) {
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

export function CardSkeleton() {
  return (
    <div className="animate-pulse card">
      <div className="flex-1 bg-base-content/20 h-48 w-full"></div>
      <div className="bg-base-content/20 my-2 h-6 w-3/4"></div>
      <div className="py-2 text-sm gap-2 my-2 h-24">
        <div className="bg-base-content/20 h-4 w-1/4 mb-2"></div>
        <div className="bg-base-content/20 h-4 w-3/4"></div>
        <hr className="my-2" />
        <div className="bg-base-content/20 h-4 w-2/4 mb-2"></div>
        <div className="bg-base-content/20 h-4 w-1/4"></div>
      </div>
    </div>
  );
}
