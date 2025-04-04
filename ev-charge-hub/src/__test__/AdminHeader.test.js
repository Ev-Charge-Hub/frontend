// __tests__/AdminHeader.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminHeader from '../components/AdminHeader';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  })
}));

describe('AdminHeader', () => {
  test('renders with Add Station button active by default', () => {
    render(
      <AdminHeader
        activeAddStation={true}
        activeEditStation={false}
        onAddStationButtonClick={() => {}}
        onEditStationButtonClick={() => {}}
        isAuthenticated={true}
        setStationData={() => {}}
      />
    );

    // Check that the buttons are rendered
    const addButton = screen.getByText('Add Station');
    const editButton = screen.getByText('Edit Station');

    expect(addButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();

    // Check the styling based on your implementation
    expect(addButton.closest('button').className).toContain('bg-[#00AB82]');
    expect(editButton.closest('button').className).not.toContain('bg-[#00AB82]');
  });

  test('calls onAddStationButtonClick when Add Station is clicked', async () => {
    const mockAddClick = jest.fn();
    const user = userEvent.setup();

    render(
      <AdminHeader
        activeAddStation={false}
        activeEditStation={true}
        onAddStationButtonClick={mockAddClick}
        onEditStationButtonClick={() => {}}
        isAuthenticated={true}
        setStationData={() => {}}
      />
    );

    // Click the Add Station button
    await user.click(screen.getByText('Add Station'));

    // Check that the click handler was called with true
    expect(mockAddClick).toHaveBeenCalledWith(true);
  });
});