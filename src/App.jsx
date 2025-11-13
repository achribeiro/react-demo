import { useEffect, useState, Suspense, lazy } from 'react';
import { UserProvider, useUsers } from './context/UserContext';
import SearchBox from './components/SearchBox';
import UserList from './components/UserList';
import Pagination from './components/Pagination';
import ErrorBoundary from './components/ErrorBoundary';
import { useDebounce } from './hooks/useDebounce';

// Lazy loading de componentes pesados
const UserForm = lazy(() => import('./components/UserForm'));
const StatsPanel = lazy(() => import('./components/StatsPanel'));

function UserDashboard() {
  const {
    users,
    loading,
    error,
    pagination,
    filters,
    stats,
    fetchUsers,
    fetchStats,
    createUser,
    updateUser,
    deleteUser,
    setFilters,
    setPage,
  } = useUsers();

  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState(filters.role || '');
  const [activeFilter, setActiveFilter] = useState(filters.is_active);

  // Debounce da busca para evitar muitas requisições
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Buscar usuários quando filtros mudarem
  useEffect(() => {
    fetchUsers({
      search: debouncedSearch,
      role: roleFilter,
      is_active: activeFilter,
      page: pagination.current_page,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, roleFilter, activeFilter, pagination.current_page]);

  // Buscar estatísticas ao montar
  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executar apenas uma vez ao montar

  const handleSearch = (value) => {
    setSearchTerm(value);
    setPage(1); // Reset para primeira página ao buscar
  };

  const handleRoleFilter = (role) => {
    setRoleFilter(role);
    setPage(1);
  };

  const handleActiveFilter = (isActive) => {
    setActiveFilter(isActive);
    setPage(1);
  };

  const handleCreateUser = async (userData) => {
    try {
      await createUser(userData);
      setShowForm(false);
      // Resetar para primeira página - o useEffect vai buscar automaticamente
      setPage(1);
      // Também buscar estatísticas atualizadas
      fetchStats();
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      await updateUser(editingUser.id, userData);
      setEditingUser(null);
      // Buscar novamente para garantir sincronização
      fetchUsers({
        search: debouncedSearch,
        role: roleFilter,
        is_active: activeFilter,
        page: pagination.current_page,
      });
      fetchStats();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      try {
        await deleteUser(id);
        // Buscar novamente para garantir sincronização
        fetchUsers({
          search: debouncedSearch,
          role: roleFilter,
          is_active: activeFilter,
          page: pagination.current_page,
        });
        fetchStats();
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>User Dashboard</h1>
        <p style={{ color: '#666' }}>Gerenciamento completo de usuários</p>
      </header>

      {/* Filtros e controles */}
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem',
      }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <SearchBox
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Buscar por nome, email, função ou empresa..."
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Função:
            </label>
            <select
              value={roleFilter}
              onChange={(e) => handleRoleFilter(e.target.value)}
              style={{
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            >
              <option value="">Todas</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="User">User</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Status:
            </label>
            <select
              value={activeFilter === null ? '' : activeFilter ? 'true' : 'false'}
              onChange={(e) => handleActiveFilter(e.target.value === '' ? null : e.target.value === 'true')}
              style={{
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            >
              <option value="">Todos</option>
              <option value="true">Ativos</option>
              <option value="false">Inativos</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              onClick={() => setShowForm(true)}
              style={{
                padding: '0.5rem 1.5rem',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                height: 'fit-content',
              }}
            >
              + Novo Usuário
            </button>
          </div>
        </div>

        {/* Estatísticas */}
        <Suspense fallback={<div>Carregando estatísticas...</div>}>
          {stats && <StatsPanel stats={stats} />}
        </Suspense>
      </div>

      {/* Loading state */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '1.2rem' }}>Carregando...</div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderRadius: '4px',
          marginBottom: '1rem',
        }}>
          <strong>Erro:</strong> {error.message || 'Ocorreu um erro ao carregar os dados'}
        </div>
      )}

      {/* User list */}
      {!loading && !error && (
        <>
          <UserList
            users={users}
            onEdit={handleEdit}
            onDelete={handleDeleteUser}
          />
          
          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
            onPageChange={setPage}
          />
        </>
      )}

      {/* Form modal */}
      {showForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem',
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            maxHeight: '90vh',
            overflowY: 'auto',
            width: '100%',
            maxWidth: '700px',
          }}>
            <Suspense fallback={<div style={{ padding: '2rem' }}>Carregando formulário...</div>}>
              <UserForm
                user={editingUser}
                onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
                onCancel={handleCancelForm}
              />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <UserDashboard />
      </UserProvider>
    </ErrorBoundary>
  );
}
