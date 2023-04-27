import Card from '../components/Card';
import CardContainer from '../components/CardContainer';
import SearchInput from '../components/SearchInput';

import { useStarships } from '../context/StarshipContext';

function HomePage() {
  const { starships } = useStarships();
  return (
    <div className="text-base-content">
      <SearchInput />
      <CardContainer>
        {starships.map((starship) => {
          return <Card starship={starship} />;
        })}
      </CardContainer>
    </div>
  );
}

export default HomePage;
