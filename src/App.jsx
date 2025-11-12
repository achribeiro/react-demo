import { useState } from "react";
import UserList from "./components/UserList";
import SearchBox from "./components/SearchBox";

export default function App() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", role: "Admin" },
    { id: 2, name: "Bob", role: "Editor" },
    { id: 3, name: "Charlie", role: "User" },
  ]);

  console.log("App render");

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>User Dashboard</h1>
      <SearchBox value={search} onChange={setSearch} />
      <UserList users={filtered} />
    </div>
  );
}
