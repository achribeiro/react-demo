import { createContext, useContext, useReducer, useCallback, useRef, useEffect } from 'react';
import { api } from '../services/api';

const UserContext = createContext(null);

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_USERS: 'SET_USERS',
  SET_PAGINATION: 'SET_PAGINATION',
  SET_FILTERS: 'SET_FILTERS',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  SET_STATS: 'SET_STATS',
};

// Initial state
const initialState = {
  users: [],
  loading: false,
  error: null,
  pagination: {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  },
  filters: {
    search: '',
    role: '',
    is_active: null,
    sort_by: 'id',
    sort_order: 'desc', // Por padrão, mostrar mais recentes primeiro
  },
  stats: null,
};

// Reducer function
function userReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ACTIONS.SET_USERS:
      return {
        ...state,
        users: action.payload.data || action.payload,
        pagination: action.payload.pagination || state.pagination,
        loading: false,
        error: null,
      };
    
    case ACTIONS.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
      };
    
    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    
    case ACTIONS.ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
        pagination: {
          ...state.pagination,
          total: state.pagination.total + 1,
        },
      };
    
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    
    case ACTIONS.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        pagination: {
          ...state.pagination,
          total: state.pagination.total - 1,
        },
      };
    
    case ACTIONS.SET_STATS:
      return { ...state, stats: action.payload };
    
    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const stateRef = useRef(state);
  
  // Manter ref atualizado com o estado
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const fetchUsers = useCallback(async (params = {}) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      // Usar ref para acessar estado atual sem criar dependências
      const currentState = stateRef.current;
      const currentFilters = currentState.filters;
      const currentPagination = currentState.pagination;
      
      const filters = { ...currentFilters, ...params };
      
      // Remover parâmetros null ou undefined da query string
      const queryParams = {
        ...filters,
        per_page: params.per_page || currentPagination.per_page,
        page: params.page || currentPagination.current_page,
      };
      
      // Remover valores null/undefined/string "null"
      Object.keys(queryParams).forEach(key => {
        if (queryParams[key] === null || queryParams[key] === undefined || queryParams[key] === 'null' || queryParams[key] === '') {
          delete queryParams[key];
        }
      });
      
      const response = await api.get('/users', queryParams);
      
      dispatch({ type: ACTIONS.SET_USERS, payload: response });
      // Só atualiza filtros se foram passados novos parâmetros
      if (Object.keys(params).length > 0) {
        dispatch({ type: ACTIONS.SET_FILTERS, payload: filters });
      }
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error });
    }
  }, []); // Sem dependências - função estável

  const fetchStats = useCallback(async () => {
    try {
      const response = await api.get('/users/stats');
      dispatch({ type: ACTIONS.SET_STATS, payload: response.data });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, []); // Sem dependências - função estável

  const createUser = useCallback(async (userData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await api.post('/users', userData);
      // Não adicionar diretamente ao estado - vamos buscar novamente da API
      // para garantir sincronização com paginação e filtros
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error });
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  const updateUser = useCallback(async (id, userData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await api.put(`/users/${id}`, userData);
      dispatch({ type: ACTIONS.UPDATE_USER, payload: response.data });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error });
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  const deleteUser = useCallback(async (id) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      await api.delete(`/users/${id}`);
      dispatch({ type: ACTIONS.DELETE_USER, payload: id });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error });
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  const setFilters = useCallback((filters) => {
    dispatch({ type: ACTIONS.SET_FILTERS, payload: filters });
    dispatch({ type: ACTIONS.SET_PAGINATION, payload: { current_page: 1 } });
  }, []);

  const setPage = useCallback((page) => {
    dispatch({ type: ACTIONS.SET_PAGINATION, payload: { current_page: page } });
  }, []);

  const value = {
    ...state,
    fetchUsers,
    fetchStats,
    createUser,
    updateUser,
    deleteUser,
    setFilters,
    setPage,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUsers() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within UserProvider');
  }
  return context;
}

