import { render, screen } from '@testing-library/svelte'
import Grid from '../src/gridjs.svelte'

test('renders the components', () => {
  render(Grid, { props: { data: [[1, 2, 3]] } })

  expect(screen.getByRole('grid')).toBeInTheDocument()
})
