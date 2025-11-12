import UserCard from "./UserCard";

export default function UserList({ users }) {
  console.log("UserList render");
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
