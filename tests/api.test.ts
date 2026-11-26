// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getCharacter, getCharacters, getEpisodes } from '@/lib/api';
import { characterList, episodes, rick } from './fixtures';

const api = 'https://rickandmortyapi.com/api';
const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
});

describe('Cliente de la API', () => {
  it('solicita la primera página por defecto y conserva sus metadatos', async () => {
    fetchMock.mockResolvedValue(Response.json(characterList));
    await expect(getCharacters()).resolves.toEqual(characterList);
    expect(fetchMock).toHaveBeenCalledWith(api + '/character?page=1');
  });

  it('envía el número de página solicitado', async () => {
    fetchMock.mockResolvedValue(Response.json(characterList));
    await getCharacters(4);
    expect(fetchMock).toHaveBeenCalledWith(api + '/character?page=4');
  });

  it('consulta un personaje por su identificador', async () => {
    fetchMock.mockResolvedValue(Response.json(rick));
    await expect(getCharacter('1')).resolves.toEqual(rick);
    expect(fetchMock).toHaveBeenCalledWith(api + '/character/1');
  });

  it('omite la petición cuando el personaje no tiene episodios', async () => {
    await expect(getEpisodes([])).resolves.toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('normaliza un episodio individual a una lista', async () => {
    fetchMock.mockResolvedValue(Response.json(episodes[0]));
    await expect(getEpisodes(['1'])).resolves.toEqual([episodes[0]]);
    expect(fetchMock).toHaveBeenCalledWith(api + '/episode/1');
  });

  it('recupera varios episodios en una sola petición y conserva el orden', async () => {
    fetchMock.mockResolvedValue(Response.json(episodes));
    await expect(getEpisodes(['1', '12'])).resolves.toEqual(episodes);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(api + '/episode/1,12');
  });

  it.each([
    ['listado', () => getCharacters(), 'Failed to fetch characters'],
    ['detalle', () => getCharacter('999'), 'Failed to fetch character details'],
    ['episodios', () => getEpisodes(['999']), 'Failed to fetch episodes'],
  ] as const)('expone el error HTTP del recurso %s', async (_, request, message) => {
    fetchMock.mockResolvedValue(new Response(null, { status: 404 }));
    await expect(request()).rejects.toThrow(message);
  });

  it('propaga los errores de conexión al consumidor', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));
    await expect(getCharacters()).rejects.toThrow('Failed to fetch');
  });
});
