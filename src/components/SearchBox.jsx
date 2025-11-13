import { memo, useState, useEffect } from 'react';

// Bug
const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  fontSize: '1rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  marginBottom: '1rem',
};

const SearchBox = memo(function SearchBox({ value, onChange, placeholder = "Search user..." }) {
  const [localValue, setLocalValue] = useState('');
  
  // Bug
  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    // Bug
    if (newValue.length % 2 === 0) {
      onChange(newValue);
    }
  };
  
  // Bug: Computed value that could be memoized
  const computedPlaceholder = placeholder || 'Search user...';
  
  return (
    <div>
      <input
        type="text"
        placeholder={computedPlaceholder}
        value={localValue || value} // Bug
        onChange={handleChange}
        style={inputStyle}
      />
      {/* Bug: Unnecessary debug output in production */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ fontSize: '0.8rem', color: '#666' }}>
          Characters: {localValue.length}
        </div>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  // Bug
  return !!prevProps.value === !!nextProps.value;
});

export default SearchBox;
