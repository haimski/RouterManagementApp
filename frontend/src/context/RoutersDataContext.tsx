import React, {useContext, createContext, useEffect, useReducer } from 'react';
import { getRouters } from '../api/RoutersApi';

interface Router {
    id: string;
    name: string;
    type: string;
    updatedAt: string;
}

interface RouterDataState  {
    routers: Router[];
    loading: boolean;
    error: string | null;
};

type Action = 
    | { type: 'SET_ROUTERS'; payload: Router[] }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'ADD_ROUTER'; payload: Router }
    | { type: 'DELETE_ROUTER'; payload: string }
    | { type: 'UPDATE_ROUTER'; payload: Router };

const initialState = {
    routers: [] as Router[],
    loading: true,
    error: null as string | null,
};

const RouterDataContext = createContext<{
    state: RouterDataState;
    dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

function reducer(state: RouterDataState, action: Action): RouterDataState {
    switch (action.type) {
        case 'SET_ROUTERS':
            return { ...state, routers: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'ADD_ROUTER':
            return { ...state, routers: [...state.routers, action.payload] };
        case 'DELETE_ROUTER':
            return { ...state, routers: state.routers.filter((router) => router.id !== action.payload) };
        case 'UPDATE_ROUTER':
            return {
                ...state,
                routers: state.routers.map((router) =>
                    router.id === action.payload.id ? { ...router, ...action.payload } : router
                )
            };
        default:
            return state;
    }
} 

export const RouterDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchRouters = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const data = await getRouters();
        dispatch({ type: 'SET_ROUTERS', payload: data });
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch routers data' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchRouters();
  }, []);

  return (
    <RouterDataContext.Provider value={{ state, dispatch }}>
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