import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Home from '@/app/page';
import { getCharacters } from '@/lib/api';
import { characterList, rick, morty } from './fixtures';

vi.mock('@/lib/api', () => ({ getCharacters: vi.fn() }));

describe('Listado de personajes', () => {
  it('convierte la página de la URL y enlaza los resultados y páginas vecinas', async () => {
    vi.mocked(getCharacters).mockResolvedValue(characterList);
    render(await Home({ searchParams: Promise.resolve({ page: '2' }) }));
    expect(getCharacters).toHaveBeenCalledWith(2);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Rick and Morty Characters');
    for (const person of [rick, morty]) {
      expect(screen.getByRole('link', { name: new RegExp(person.name) }))
        .toHaveAttribute('href', '/character/' + person.id);
    }
    expect(screen.getByRole('link', { name: /Next/ })).toHaveAttribute('href', '/?page=3');
    expect(screen.getByText('Page 2 of 3')).toBeVisible();
  });

  it.each([{}, { page: ['2', '3'] }])('usa la primera página si falta un valor único', async (params) => {
    vi.mocked(getCharacters).mockResolvedValue({ ...characterList, results: [] });
    render(await Home({ searchParams: Promise.resolve(params) }));
    expect(getCharacters).toHaveBeenLastCalledWith(1);
    expect(screen.getByText('Page 1 of 3')).toBeVisible();
    expect(screen.queryAllByRole('heading', { level: 2 })).toHaveLength(0);
  });
});
