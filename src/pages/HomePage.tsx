import Card from '../components/Card';
import CardContainer from '../components/CardContainer';
import SearchInput from '../components/SearchInput';

import { useStarships } from '../context/StarshipContext';

function HomePage() {
  const { starships } = useStarships();
  return (
    <section>
      <CardContainer>
        {starships.map((starship) => {
          return <Card starship={starship} />;
        })}
      </CardContainer>
    </section>
  );
}

export default HomePage;
