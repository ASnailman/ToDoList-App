import { render, screen } from '@testing-library/react';
import ToDoListApp from './ToDoListApp';

test('renders learn react link', () => {
  render(<ToDoListApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
