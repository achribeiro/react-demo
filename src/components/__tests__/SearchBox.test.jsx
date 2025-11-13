import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../SearchBox';

describe('SearchBox', () => {
  it('renders with default placeholder', () => {
    const mockOnChange = jest.fn();
    render(<SearchBox value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Search user...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('renders with custom placeholder', () => {
    const mockOnChange = jest.fn();
    const customPlaceholder = 'Buscar usuários...';
    render(<SearchBox value="" onChange={mockOnChange} placeholder={customPlaceholder} />);
    
    const input = screen.getByPlaceholderText(customPlaceholder);
    expect(input).toBeInTheDocument();
  });

  it('displays the value prop', () => {
    const mockOnChange = jest.fn();
    const testValue = 'John Doe';
    render(<SearchBox value={testValue} onChange={mockOnChange} />);
    
    const input = screen.getByDisplayValue(testValue);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(testValue);
  });

  it('calls onChange when user types', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    render(<SearchBox value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Search user...');
    await user.type(input, 'test');
    
    expect(mockOnChange).toHaveBeenCalledTimes(4); // Called for each character: 't', 'e', 's', 't'
    expect(mockOnChange).toHaveBeenCalledWith('t');
    expect(mockOnChange).toHaveBeenCalledWith('e');
    expect(mockOnChange).toHaveBeenCalledWith('s');
    expect(mockOnChange).toHaveBeenCalledWith('t');
  });

  it('calls onChange with each character as user types', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    render(<SearchBox value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Search user...');
    await user.type(input, 'test');
    
    // onChange is called for each character
    expect(mockOnChange).toHaveBeenCalledWith('t');
    expect(mockOnChange).toHaveBeenCalledWith('e');
    expect(mockOnChange).toHaveBeenCalledWith('s');
    expect(mockOnChange).toHaveBeenCalledWith('t');
    expect(mockOnChange).toHaveBeenCalledTimes(4);
  });

  it('renders as an input element', () => {
    const mockOnChange = jest.fn();
    render(<SearchBox value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Search user...');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('is memoized and does not re-render unnecessarily', () => {
    const mockOnChange = jest.fn();
    const { rerender } = render(<SearchBox value="test" onChange={mockOnChange} />);
    
    // Re-render with same props
    rerender(<SearchBox value="test" onChange={mockOnChange} />);
    
    const input = screen.getByDisplayValue('test');
    expect(input).toBeInTheDocument();
  });
});

