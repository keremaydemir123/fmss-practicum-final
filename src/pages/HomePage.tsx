import { useStarships } from '../context/StarshipContext';

function HomePage() {
  const { starships } = useStarships();
  return (
    <div className="text-base-content">
      <h1>Home Page</h1>
      <div>
        {starships.map((starship) => {
          return (
            <div key={starship.id}>
              <h2>{starship.name}</h2>
              <p>{starship.model}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
