import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CharacterPage from '@/app/character/[id]/page';
import { getCharacter, getEpisodes } from '@/lib/api';
import { episodes, rick } from './fixtures';

vi.mock('@/lib/api', () => ({ getCharacter: vi.fn(), getEpisodes: vi.fn() }));

describe('Detalle de personaje', () => {
  it('extrae los IDs de episodio y muestra la ficha con sus apariciones', async () => {
    vi.mocked(getCharacter).mockResolvedValue({
      ...rick, created: new Date(2017, 10, 4, 12).toISOString(),
    });
    vi.mocked(getEpisodes).mockResolvedValue(episodes);
    render(await CharacterPage({ params: Promise.resolve({ id: '1' }) }));

    expect(getCharacter).toHaveBeenCalledWith('1');
    expect(getEpisodes).toHaveBeenCalledWith(['1', '12']);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(rick.name);
    expect(screen.getByRole('img', { name: rick.name })).toBeVisible();
    expect(screen.getByText(rick.origin.name)).toBeVisible();
    expect(screen.getByText(rick.location.name)).toBeVisible();
    expect(screen.getByText(rick.gender)).toBeVisible();
    expect(screen.getByText('November 4, 2017')).toBeVisible();
    expect(screen.getByText('Unknown')).toBeVisible();
    expect(screen.getByRole('link', { name: /Back to Characters/ })).toHaveAttribute('href', '/');
    expect(screen.getByRole('heading', { name: 'Episodes (2)' })).toBeVisible();
    for (const ep of episodes) {
      expect(screen.getByText(ep.episode)).toHaveAttribute('title', ep.name + ' - ' + ep.air_date);
    }
  });

  it.each([
    ['Alive', 'bg-green-500'], ['Dead', 'bg-red-500'], ['unknown', 'bg-gray-500'],
  ] as const)('muestra estado %s, tipo y cero apariciones', async (status, color) => {
    vi.mocked(getCharacter).mockResolvedValue({ ...rick, status, type: 'Cyborg', episode: [] });
    vi.mocked(getEpisodes).mockResolvedValue([]);
    render(await CharacterPage({ params: Promise.resolve({ id: '1' }) }));
    expect(getEpisodes).toHaveBeenLastCalledWith([]);
    expect(screen.getByText(status + ' - Human').previousElementSibling).toHaveClass(color);
    expect(screen.getByText('Cyborg')).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Episodes (0)' })).toBeVisible();
  });

  it('propaga el fallo del personaje sin intentar consultar episodios', async () => {
    vi.mocked(getCharacter).mockRejectedValue(new Error('Character unavailable'));
    await expect(CharacterPage({ params: Promise.resolve({ id: '404' }) }))
      .rejects.toThrow('Character unavailable');
    expect(getEpisodes).not.toHaveBeenCalled();
  });
});
