import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CharacterCard from '@/components/CharacterCard';
import type { Character } from '@/types/rickandmorty';
import { rick } from './fixtures';

describe('CharacterCard', () => {
  it('muestra nombre, retrato y ubicación dentro del enlace al detalle', () => {
    render(<CharacterCard character={rick} />);
    const link = screen.getByRole('link', { name: /Rick Sanchez/ });
    expect(link).toHaveAttribute('href', '/character/1');
    expect(link).toContainElement(screen.getByRole('heading', { name: rick.name }));
    expect(link).toContainElement(screen.getByRole('img', { name: rick.name }));
    expect(link).toHaveTextContent(rick.location.name);
  });

  it.each([
    ['Alive', 'bg-green-500'], ['Dead', 'bg-red-500'], ['unknown', 'bg-gray-500'],
  ] as const)('representa el estado %s con texto y color', (status, color) => {
    render(<CharacterCard character={{ ...rick, status }} />);
    const label = screen.getByText(status + ' - Human');
    expect(label.previousElementSibling).toHaveClass(color);
  });

  it('usa el indicador gris si la API envía un estado fuera del catálogo', () => {
    // Una respuesta externa puede incumplir el contrato de TypeScript.
    const unexpected = { ...rick, status: 'Indeterminate' } as unknown as Character;
    render(<CharacterCard character={unexpected} />);
    expect(screen.getByText('Indeterminate - Human').previousElementSibling).toHaveClass('bg-gray-500');
  });
});
