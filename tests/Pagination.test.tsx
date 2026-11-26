import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Pagination from '@/components/Pagination';

describe('Pagination', () => {
  it.each([
    { current: 1, total: 3, prev: null, next: '/?page=2' },
    { current: 2, total: 3, prev: '/?page=1', next: '/?page=3' },
    { current: 3, total: 3, prev: '/?page=2', next: null },
    { current: 1, total: 1, prev: null, next: null },
  ])('ofrece las direcciones válidas en la página $current de $total', ({ current, total, prev, next }) => {
    render(<Pagination currentPage={current} totalPages={total} />);
    expect(screen.getByText('Page ' + current + ' of ' + total)).toBeVisible();
    for (const [name, href] of [[/Previous/, prev], [/Next/, next]] as const) {
      expect(screen.getByText(name)).toBeVisible();
      const link = screen.queryByRole('link', { name });
      if (href) expect(link).toHaveAttribute('href', href);
      else expect(link).not.toBeInTheDocument();
    }
  });
});
