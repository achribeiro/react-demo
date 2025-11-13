import { memo } from 'react';
import UserCard from './UserCard';

const UserList = memo(function UserList({ users, onEdit, onDelete }) {
  console.log("UserList render");

  if (users.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        Nenhum usuário encontrado
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Usuários ({users.length})</h2>
      <div>
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
});

export default UserList;
