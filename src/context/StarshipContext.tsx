import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';

import { Starship } from '../types';
import { getAllStarships, getNextStarshipsByUrl } from '../api';

interface StarshipContextType {
  starships: Starship[];
  loading: boolean;
  error: string;
  getNextStarships: () => void;
  nextUrl: string;
}

export const StarshipContext = createContext<StarshipContextType>({
  starships: [] as Starship[],
  loading: false,
  error: '',
  getNextStarships: () => null,
  nextUrl: '',
});

export const useStarships = () => useContext(StarshipContext);

export const StarshipProvider = ({ children }: { children: ReactNode }) => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [nextUrl, setNextUrl] = useState<string>('');

  // get all starships on mount
  useEffect(() => {
    setLoading(true);
    getAllStarships()
      .then((response) => {
        const completeStarships = addIdAndImageToStarships(
          response.data.results
        );
        setStarships(completeStarships);
        setNextUrl(response.data.next);
      })
      .catch(() => {
        setError("Couldn't fetch starships.");
      })
      .finally(() => setLoading(false));
  }, []);

  const getNextStarships = useCallback(() => {
    if (!nextUrl) {
      setLoading(false);
      setError('No more starships to show.');
      return;
    }

    setLoading(true);

    return getNextStarshipsByUrl(nextUrl)
      .then((response) => {
        const completeStarships = addIdAndImageToStarships(
          response.data.results
        );
        setStarships((prev) => [...prev, ...completeStarships]);
        setNextUrl(response.data.next);
      })
      .catch(() => {
        setError("Couldn't fetch starships.");
      })
      .finally(() => setLoading(false));
  }, [nextUrl]);

  function addIdAndImageToStarships(starships: Starship[]) {
    const IMAGE_URL = '/starship.jpg';

    return starships.map((starship) => {
      Object.assign(starship, {
        id: starship.url.split('/')[5],
        image: IMAGE_URL,
      });
      return starship;
    });
  }

  return (
    <StarshipContext.Provider
      value={{ starships, loading, error, getNextStarships, nextUrl }}
    >
      {children}
    </StarshipContext.Provider>
  );
};
