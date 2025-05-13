import React, {useContext, createContext, useState, useEffect } from 'react';
import { getRouters } from '../api/RoutersApi';

interface Router {
    id: string;
    name: string;
    type: string;
    updatedAt: string;
}

interface RouterDataContextProps {
    routers: Router[];
    loading: boolean;
    error: string | null;
}

const RouterDataContext = createContext<RouterDataContextProps | undefined>(undefined);
export const RouterDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [routers, setRouters] = useState<Router[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRouters = async () => {
      try {
        const data = await getRouters();
        setRouters(data);
      } catch (err) {
        setError('Failed to fetch routers data');
      } finally {
        setLoading(false);
      }
    };

    fetchRouters();
  }, []);

  return (
    <RouterDataContext.Provider value={{ routers, loading, error }}>
      {children}
    </RouterDataContext.Provider>
  );
}

export const useRouterData = () => {
  const context = useContext(RouterDataContext);
  if (!context) {
    throw new Error('useRouterData must be used within a RouterDataProvider');
  }
  return context;
};