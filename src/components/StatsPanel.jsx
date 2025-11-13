import { memo } from 'react';

const StatsPanel = memo(function StatsPanel({ stats }) {
  if (!stats) return null;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      marginTop: '1rem',
    }}>
      <div style={{
        padding: '1rem',
        backgroundColor: '#1976d2',
        color: 'white',
        borderRadius: '8px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.total}</div>
        <div style={{ fontSize: '0.9rem' }}>Total de Usuários</div>
      </div>

      <div style={{
        padding: '1rem',
        backgroundColor: '#388e3c',
        color: 'white',
        borderRadius: '8px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.active}</div>
        <div style={{ fontSize: '0.9rem' }}>Usuários Ativos</div>
      </div>

      <div style={{
        padding: '1rem',
        backgroundColor: '#d32f2f',
        color: 'white',
        borderRadius: '8px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.inactive}</div>
        <div style={{ fontSize: '0.9rem' }}>Usuários Inativos</div>
      </div>

      {stats.by_role && Object.entries(stats.by_role).map(([role, count]) => (
        <div
          key={role}
          style={{
            padding: '1rem',
            backgroundColor: '#757575',
            color: 'white',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{count}</div>
          <div style={{ fontSize: '0.9rem' }}>{role}</div>
        </div>
      ))}
    </div>
  );
});

export default StatsPanel;


