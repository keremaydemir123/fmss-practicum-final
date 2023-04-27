import { Card, CardSkeleton } from '../components/Card';
import CardContainer from '../components/CardContainer';
import ErrorSection from '../components/ErrorSection';
import LoadMoreButton from '../components/LoadMoreButton';
import Loading from '../components/Loading';

import { useStarships } from '../context/StarshipContext';
import { Starship } from '../types';

function HomePage() {
  const { starships, loading, error } = useStarships();

  if (error) return <ErrorSection status="500" error={error} />;

  return (
    <>
      <CardContainer>
        {loading && <Loading />}
        {starships.length == 0 && <Skeletons />}
        <Cards starships={starships} />
      </CardContainer>
      <div className="w-full flex items-center justify-center">
        <LoadMoreButton>Load More</LoadMoreButton>
      </div>
    </>
  );
}

export default HomePage;

const Cards = ({ starships }: { starships: Starship[] }) => {
  return (
    <>
      {starships.map((starship) => {
        return <Card key={starship.id} starship={starship} />;
      })}
    </>
  );
};

const Skeletons = () => {
  // at initial load, show 10 skeletons
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => {
        return <CardSkeleton key={index} />;
      })}
    </>
  );
};
