import { createContext, useContext, useReducer } from 'react';

type RouterType = 'all' | 'wifi' | 'enterprise' | 'home' | String;
type SortOption = string;
type FilterText = string;

interface RouterFilterState {
    routerType: RouterType;
    sortOption: SortOption;
    filterText: string;
}

type Action = 
    | { type: 'SET_ROUTER_TYPE'; payload: RouterType }
    | { type: 'SET_SORT_BY'; payload: SortOption }
    | { type: 'SET_FILTER_TEXT'; payload: FilterText }

const initialState: RouterFilterState = {
    routerType: 'all',
    sortOption: 'name',
    filterText: '',
};

const RouterFilterContext = createContext<{
    state: RouterFilterState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => undefined,
});

function reducer(state: RouterFilterState, action: Action): RouterFilterState {
    switch (action.type) {
        case 'SET_ROUTER_TYPE':
            return { ...state, routerType: action.payload };
        case 'SET_SORT_BY':
            return { ...state, sortOption: action.payload };
        case 'SET_FILTER_TEXT':
            return { ...state, filterText: action.payload };
        default:
            return state;
    }
}

export const RouterFilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <RouterFilterContext.Provider value={{ state, dispatch }}>
            {children}
        </RouterFilterContext.Provider>
    );
}
export const useRouterFilter = () => {
    const context = useContext(RouterFilterContext);
    if (!context) {
        throw new Error('useRouterFilter must be used within a RouterFilterProvider');
    }
    return context;
}
export default RouterFilterContext;