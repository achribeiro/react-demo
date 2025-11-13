import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserCard from '../UserCard';

describe('UserCard', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    is_active: true,
    avatar: 'https://example.com/avatar.jpg',
    company: 'Acme Corp',
    phone: '+1234567890',
    website: 'https://johndoe.com',
    bio: 'Software developer',
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user information', () => {
    render(<UserCard user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('renders user avatar when provided', () => {
    render(<UserCard user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('does not render avatar when not provided', () => {
    const userWithoutAvatar = { ...mockUser, avatar: null };
    render(<UserCard user={userWithoutAvatar} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    const avatar = screen.queryByAltText('John Doe');
    expect(avatar).not.toBeInTheDocument();
  });

  it('displays role badge with correct color for Admin', () => {
    render(<UserCard user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    const roleBadge = screen.getByText('Admin');
    expect(roleBadge).toBeInTheDocument();
  });

  it('displays role badge with correct color for Editor', () => {
    const editorUser = { ...mockUser, role: 'Editor' };
    render(<UserCard user={editorUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    const roleBadge = screen.getByText('Editor');
    expect(roleBadge).toBeInTheDocument();
  });

  it('displays "Inativo" badge when user is inactive', () => {
    const inactiveUser = { ...mockUser, is_active: false };
    render(<UserCard user={inactiveUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });

  it('does not display "Inativo" badge when user is active', () => {
    render(<UserCard user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    expect(screen.queryByText('Inativo')).not.toBeInTheDocument();
  });

  it('expands to show additional details when expand button is clicked', async () => {
    const user = userEvent.setup();
    render(<UserCard user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    // Additional details should not be visible initially
    expect(screen.queryByText(/Empresa:/)).not.toBeInTheDocument();
    
    // Click expand button
    const expandButton = screen.getByRole('button', { name: /▶/ });
    await user.click(expandButton);
    
    // Additional details should now be visible
    expect(screen.getByText(/Empresa:/)).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText(/Telefone:/)).toBeInTheDocument();
    expect(screen.getByText('+1234567890')).toBeInTheDocument();
    expect(screen.getByText(/Website:/)).toBeInTheDocument();
    expect(screen.getByText(/Bio:/)).toBeInTheDocument();
    expect(screen.getByText('Software developer')).toBeInTheDocument();
  });

  it('collapses when expand button is clicked again', async () => {
    const user = userEvent.setup();
    render(<UserCard user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    // Expand
    const expandButton = screen.getByRole('button', { name: /▶/ });
    await user.click(expandButton);
    expect(screen.getByText(/Empresa:/)).toBeInTheDocument();
    
    // Collapse
    const collapseButton = screen.getByRole('button', { name: /▼/ });
    await user.click(collapseButton);
    expect(screen.queryByText(/Empresa:/)).not.toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<UserCard user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    const editButton = screen.getByRole('button', { name: 'Editar' });
    await user.click(editButton);
    
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
  });

  it('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<UserCard user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: 'Deletar' });
    await user.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockUser.id);
  });

  it('does not render edit button when onEdit is not provided', () => {
    render(<UserCard user={mockUser} onDelete={mockOnDelete} />);
    
    expect(screen.queryByRole('button', { name: 'Editar' })).not.toBeInTheDocument();
  });

  it('does not render delete button when onDelete is not provided', () => {
    render(<UserCard user={mockUser} onEdit={mockOnEdit} />);
    
    expect(screen.queryByRole('button', { name: 'Deletar' })).not.toBeInTheDocument();
  });

  it('renders website link when provided', async () => {
    const user = userEvent.setup();
    render(<UserCard user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    // Expand to see website
    const expandButton = screen.getByRole('button', { name: /▶/ });
    await user.click(expandButton);
    
    const websiteLink = screen.getByRole('link', { name: 'https://johndoe.com' });
    expect(websiteLink).toBeInTheDocument();
    expect(websiteLink).toHaveAttribute('href', 'https://johndoe.com');
    expect(websiteLink).toHaveAttribute('target', '_blank');
    expect(websiteLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render optional fields when they are not provided', async () => {
    const user = userEvent.setup();
    const minimalUser = {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      role: 'User',
      is_active: true,
    };
    
    render(<UserCard user={minimalUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    // Expand
    const expandButton = screen.getByRole('button', { name: /▶/ });
    await user.click(expandButton);
    
    // Optional fields should not be rendered
    expect(screen.queryByText(/Empresa:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Telefone:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Website:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Bio:/)).not.toBeInTheDocument();
  });

  it('applies correct styling for active user', () => {
    const { container } = render(<UserCard user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    const card = container.firstChild;
    expect(card).toHaveStyle({ backgroundColor: '#fff' });
    expect(card).toHaveStyle({ opacity: '1' });
  });

  it('applies correct styling for inactive user', () => {
    const inactiveUser = { ...mockUser, is_active: false };
    const { container } = render(<UserCard user={inactiveUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    const card = container.firstChild;
    expect(card).toHaveStyle({ backgroundColor: '#f5f5f5' });
    expect(card).toHaveStyle({ opacity: '0.7' });
  });
});

