import type { Character, CharacterResponse, Episode } from '@/types/rickandmorty';

const api = 'https://rickandmortyapi.com/api';

export const rick: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: api + '/location/1' },
  location: { name: 'Citadel of Ricks', url: api + '/location/3' },
  image: api + '/character/avatar/1.jpeg',
  episode: [api + '/episode/1', api + '/episode/12'],
  url: api + '/character/1',
  created: '2017-11-04T18:48:46.250Z',
};

export const morty: Character = {
  ...rick, id: 2, name: 'Morty Smith', image: api + '/character/avatar/2.jpeg',
  url: api + '/character/2',
};

export const characterList: CharacterResponse = {
  results: [rick, morty],
  info: { count: 6, pages: 3, next: api + '/character?page=2', prev: null },
};

export const episodes: Episode[] = [
  { id: 1, name: 'Pilot', episode: 'S01E01', air_date: 'December 2, 2013',
    characters: [rick.url], url: api + '/episode/1', created: '2017-11-10T12:00:00Z' },
  { id: 12, name: 'A Rickle in Time', episode: 'S02E01', air_date: 'July 26, 2015',
    characters: [rick.url], url: api + '/episode/12', created: '2017-11-10T12:00:00Z' },
];
