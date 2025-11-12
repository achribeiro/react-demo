import { useState, useMemo, useCallback, useEffect, useRef } from "react";
// import { useState, useEffect } from "react";
import UserList from "./components/UserList";
import SearchBox from "./components/SearchBox";

export default function App() {
  const searchRef = useRef("");
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://jsonplaceholder.typicode.com/users?name=" + searchRef.current);
      const data = await response.json();
    }
    fetchData();
  }, [searchRef.current]);
  const [search, setSearch] = useState("");
  searchRef.current = search;
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", role: "Admin" },
    { id: 2, name: "Bob", role: "Editor" },
    { id: 3, name: "Charlie", role: "User" },
  ]);

  console.log("App render");

  const handleSearch = useCallback(value => setSearch(value), []);

  // const filtered = users.filter(u =>
  //   u.name.toLowerCase().includes(search.toLowerCase())
  // );

  const filtered = useMemo(
    () => users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase())
    ),
    [users, search]
  );


  return (
    <div>
      <h1>User Dashboard</h1>
      {/* <SearchBox value={search} onChange={setSearch} /> */}
      <SearchBox value={search} onChange={handleSearch} />
      <UserList users={filtered} />
    </div>
  );
}
