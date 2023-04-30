import React from 'react';
import { useStarships } from '../context/StarshipContext';

function LoadMoreButton(props: React.ComponentPropsWithoutRef<'button'>) {
  const { nextUrl, getNextStarships } = useStarships();
  const { children } = props;
  return (
    <button
      onClick={getNextStarships}
      disabled={!nextUrl}
      className="btn btn-primary w-max mt-6"
      {...props}
    >
      {nextUrl == null ? 'No More Starships' : children}
    </button>
  );
}

export default LoadMoreButton;
