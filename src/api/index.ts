import axios, { AxiosResponse } from 'axios';
import { Starship } from '../types';

interface InitialStarshipsPromise {
  count: number;
  next: string;
  previous: string;
  results: Starship[];
}

export function getInitialStarships(): Promise<
  AxiosResponse<InitialStarshipsPromise>
> {
  return axios.get('https://swapi.dev/api/starships/');
}

export function getStarshipById(id: number): Promise<AxiosResponse<Starship>> {
  if (!id) {
    throw new Error('id is required and it must be a number');
  }
  return axios.get(`https://swapi.dev/api/starships/${id}/`);
}

export function getNextStarshipsByUrl(
  url: string
): Promise<AxiosResponse<InitialStarshipsPromise>> {
  return axios.get(url);
}
