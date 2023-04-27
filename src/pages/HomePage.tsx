import Card from '../components/Card';
import CardContainer from '../components/CardContainer';

import { useStarships } from '../context/StarshipContext';

function HomePage() {
  const { starships } = useStarships();
  return (
    <div className="text-base-content">
      <h1>Home Page</h1>
      <CardContainer>
        {starships.map((starship) => {
          return <Card starship={starship} />;
        })}
      </CardContainer>
    </div>
  );
}

export default HomePage;
