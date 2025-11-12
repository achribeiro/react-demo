export default function SearchBox({ value, onChange }) {
  console.log("SearchBox render");
  return (
    <input
      type="text"
      placeholder="Search user..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
