import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';

import DetailBox from '../components/TextBox';
import { Starship } from '../types';
import { getStarshipById } from '../api';

function DetailsPage() {
  const [starship, setStarship] = useState<Starship | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setLoading(true);
    getStarshipById(Number(id))
      .then((response: AxiosResponse) => {
        setStarship(response.data);
      })
      .catch((error) => {
        setError(`starship with id ${id} not found`);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <section className="flex flex-col items-center justify-center h-full">
        <h1 className="heading error">404 Error</h1>
        <p className="heading !text-2xl">{error}</p>
      </section>
    );
  }

  return (
    <section className="h-full w-full flex flex-col gap-4 justify-center">
      <h1 className="heading !text-right text-shadow">{starship?.name}</h1>
      <div className="w-full flex md:flex-row flex-col gap-4 justify-between items-start">
        <div className="md:flex-1 flex justify-center items-center w-full">
          <img src="/starship.jpg" alt="Starship" className="max-h-80" />
        </div>
        <div className="md:flex-1 w-full grid h-full sm:grid-cols-2 grid-cols-1 gap-4 text-bold text-lg prose">
          <DetailBox title="Model" value={starship?.model} />
          <DetailBox
            title="Hyperdrive Rating"
            value={starship?.hyperdrive_rating}
          />
          <DetailBox title="Crew" value={starship?.crew} />
          <DetailBox title="Length" value={starship?.length} />
          <DetailBox title="Cargo Capacity" value={starship?.cargo_capacity} />
          <DetailBox title="Passengers" value={starship?.passengers} />
          <DetailBox
            title="Max Atmosphering Speed"
            value={starship?.max_atmosphering_speed}
          />
          <DetailBox title="Manufacturer" value={starship?.manufacturer} />
        </div>
      </div>
    </section>
  );
}

export default DetailsPage;
