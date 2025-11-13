import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

/**
 * Custom hook para fazer requisições à API
 * Gerencia loading, error e data states
 */
export function useApi(endpoint, options = {}) {
  const { immediate = true, params = {} } = options;
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (customParams = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(endpoint, { ...params, ...customParams });
      setData(response);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint, params]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  const refetch = useCallback(() => {
    return execute();
  }, [execute]);

  return { data, loading, error, refetch, execute };
}


