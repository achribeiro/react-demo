import { memo } from 'react';

const SearchBox = memo(function SearchBox({ value, onChange, placeholder = "Search user..." }) {
  console.log("SearchBox render");
  
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%',
        padding: '0.75rem',
        fontSize: '1rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginBottom: '1rem',
      }}
    />
  );
});

export default SearchBox;
