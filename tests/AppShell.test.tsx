import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ErrorView from '@/app/error';
import Loading from '@/app/loading';
import RootLayout from '@/app/layout';

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: 'font-sans' }),
  Geist_Mono: () => ({ variable: 'font-mono' }),
}));

describe('Estructura y estados de la aplicación', () => {
  it('envuelve la página con navegación y enlaces de referencia', () => {
    render(<RootLayout><h1>Personajes</h1></RootLayout>, { container: document });
    const nav = within(screen.getByRole('navigation'));
    expect(document.documentElement.lang).toBe('en');
    expect(nav.getByRole('link', { name: 'Characters' })).toHaveAttribute('href', '/');
    expect(nav.getByRole('link', { name: 'API Docs' }))
      .toHaveAttribute('href', 'https://rickandmortyapi.com/documentation');
    expect(screen.getByRole('main')).toContainElement(screen.getByRole('heading', { name: 'Personajes' }));
    expect(screen.getByRole('contentinfo')).toHaveTextContent('The Rick and Morty API');
  });

  it('reserva ocho espacios para las tarjetas mientras carga el listado', () => {
    const { container } = render(<Loading />);
    expect(container.querySelectorAll('.grid > .animate-pulse')).toHaveLength(8);
  });

  it('registra el error y permite que el usuario reintente la carga', () => {
    const error = new Error('Servicio no disponible');
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    const reset = vi.fn();
    render(<ErrorView error={error} reset={reset} />);
    expect(log).toHaveBeenCalledWith(error);
    expect(screen.getByRole('heading', { name: 'Something went wrong!' })).toBeVisible();
    expect(reset).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
