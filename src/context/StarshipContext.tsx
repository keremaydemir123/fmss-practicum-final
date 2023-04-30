import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';

import { Starship } from '../types';
import { getInitialStarships, getNextStarshipsByUrl } from '../api';

interface StarshipContextType {
  allStarships: Starship[];
  starships: Starship[];
  loading: boolean;
  error: string;
  getNextStarships: () => void;
  nextUrl: string;
}

export const StarshipContext = createContext<StarshipContextType>({
  allStarships: [] as Starship[],
  starships: [] as Starship[],
  loading: false,
  error: '',
  getNextStarships: () => null,
  nextUrl: '',
});

// eslint-disable-next-line react-refresh/only-export-components
export const useStarships = () => useContext(StarshipContext);

export const StarshipProvider = ({ children }: { children: ReactNode }) => {
  const [starships, setStarships] = useState<Starship[]>([]); // this will be used for rendering
  const [allStarships, setAllStarships] = useState<Starship[]>([]); // this will be used for search
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [nextUrl, setNextUrl] = useState<string>('');

  // on mount, get all starships and starships to render
  useEffect(() => {
    setLoading(true);
    Promise.all([getFirstStarships(), getAllStarships()])
      .then((res) => {
        setStarships(addIdAndImageToStarships(res[0].results));
        setNextUrl(res[0].next);
        setAllStarships(addIdAndImageToStarships(res[1]));
      })
      .catch(() => setError("Couldn't fetch starships."))
      .finally(() => setLoading(false));
  }, []);

  async function getFirstStarships() {
    const response = await getInitialStarships();
    return response.data;
  }

  async function getAllStarships() {
    const initialStarshipsRes = await getInitialStarships();
    let prevStarships = JSON.parse(JSON.stringify(initialStarshipsRes));

    const otherStarships: Starship[] = [];
    do {
      const nextStarships = await getNextStarshipsByUrl(
        prevStarships.data.next
      );
      otherStarships.push(...nextStarships.data.results);
      prevStarships = nextStarships;
    } while (prevStarships.data.next);
    return otherStarships;
  }

  // this function will be used from LoadMoreButton component only
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
    // images can be loaded from api, but they are not available
    // so I will use a placeholder image
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
      value={{
        starships,
        allStarships,
        loading,
        error,
        getNextStarships,
        nextUrl,
      }}
    >
      {children}
    </StarshipContext.Provider>
  );
};
