import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import toast, { Toaster } from 'react-hot-toast';

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
  starships: [],
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
        const starshipsWithId = addIdToStarships(response.data.results);
        setStarships(starshipsWithId);
        setNextUrl(response.data.next);
      })
      .catch((error) => {
        setError(error.message);
        toast.error(error.message);
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
        const starshipsWithId = addIdToStarships(response.data.results);
        setStarships((prev) => [...prev, ...starshipsWithId]);
        setNextUrl(response.data.next);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [nextUrl]);

  function addIdToStarships(starships: Starship[]) {
    return starships.map((starship) => {
      Object.assign(starship, { id: starship.url.split('/')[5] });
      return starship;
    });
  }

  return (
    <StarshipContext.Provider
      value={{ starships, loading, error, getNextStarships, nextUrl }}
    >
      <Toaster />
      {children}
    </StarshipContext.Provider>
  );
};
