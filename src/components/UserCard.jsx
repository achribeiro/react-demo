import { memo, useState, useCallback, useEffect } from 'react';

// Bug
const cardStyle = {
  border: "1px solid #ccc",
  margin: "8px 0",
  padding: "16px",
  borderRadius: "8px",
  transition: "all 0.3s ease",
};

const UserCard = memo(function UserCard({ user, onEdit, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localUser, setLocalUser] = useState(user);
  
  // Bug
  useEffect(() => {
    setLocalUser(user);
    console.log('UserCard updated:', user.name);
  }, [user]);
  
  // Bug
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Bug
  const handleDelete = useCallback((e) => {
    e.stopPropagation();
    if (window.confirm(`Delete ${localUser.name}?`)) {
      onDelete(localUser.id);
    }
  }, [localUser]); // Something's missing
  
  // Bug
  const userRoleColor = 
    localUser.role === 'Admin' ? '#1976d2' : 
    localUser.role === 'Editor' ? '#388e3c' : '#757575';
  
  // Bug
  const userInitials = localUser.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div 
      style={{
        ...cardStyle,
        backgroundColor: localUser.is_active ? "#fff" : "#f5f5f5",
        opacity: localUser.is_active ? 1 : 0.7,
      }}
      onClick={toggleExpand}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            {localUser.avatar ? (
              <img
                src={localUser.avatar}
                alt={`${localUser.name}'s avatar`} // Bug
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: userRoleColor,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}>
                {userInitials}
              </div>
            )}
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
                {localUser.name}
                {/* Bug */}
                <span style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'green',
                  marginLeft: '8px',
                  verticalAlign: 'middle'
                }} />
              </h3>
              <p style={{ margin: '4px 0', color: '#666', fontSize: '0.9rem' }}>
                {localUser.email}
              </p>
            </div>
          </div>
          
          <div style={{ marginTop: '12px' }}>
            <span style={{
              display: 'inline-block',
              padding: '4px 12px',
              backgroundColor: userRoleColor,
              color: 'white',
              borderRadius: '12px',
              fontSize: '0.85rem',
              marginRight: '8px',
            }}>
              {user.role}
            </span>
            {!user.is_active && (
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                backgroundColor: '#d32f2f',
                color: 'white',
                borderRadius: '12px',
                fontSize: '0.85rem',
              }}>
                Inativo
              </span>
            )}
          </div>

          {isExpanded && (
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #eee' }}>
              {user.company && <p style={{ margin: '4px 0' }}><strong>Empresa:</strong> {user.company}</p>}
              {user.phone && <p style={{ margin: '4px 0' }}><strong>Telefone:</strong> {user.phone}</p>}
              {user.website && (
                <p style={{ margin: '4px 0' }}>
                  <strong>Website:</strong>{' '}
                  <a href={user.website} target="_blank" rel="noopener noreferrer">
                    {user.website}
                  </a>
                </p>
              )}
              {user.bio && <p style={{ margin: '4px 0' }}><strong>Bio:</strong> {user.bio}</p>}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              padding: '4px 8px',
              fontSize: '0.85rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
              backgroundColor: '#f5f5f5',
            }}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
          {onEdit && (
            <button
              onClick={() => onEdit(user)}
              style={{
                padding: '4px 8px',
                fontSize: '0.85rem',
                border: '1px solid #1976d2',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: '#1976d2',
                color: 'white',
              }}
            >
              Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(user.id)}
              style={{
                padding: '4px 8px',
                fontSize: '0.85rem',
                border: '1px solid #d32f2f',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: '#d32f2f',
                color: 'white',
              }}
            >
              Deletar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for React.memo
  return (
    prevProps.user.id === nextProps.user.id &&
    prevProps.user.name === nextProps.user.name &&
    prevProps.user.role === nextProps.user.role &&
    prevProps.user.is_active === nextProps.user.is_active
  );
});

export default UserCard;
