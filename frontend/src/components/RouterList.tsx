import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouterData } from '../context/RoutersDataContext';
import { useRouterFilter } from '../context/RoutersFilterContext';
import RouterDetails from './RouterDetails';
import RouterCard from './RouterCard';
import Button from '@mui/material/Button';
import AddRouter from './AddRouter';
import EditRouterDetails from './EditRouterDetails';

interface Router {
    id: string;
    name: string;
    type: string;
    updatedAt: string;
}

const PAGE_SIZE = 20;

const RouterList = () => {
    const { state: filterState } = useRouterFilter();
    const { routerType, sortOption, filterText } = filterState;
    const { state: routerDataState, dispatch } = useRouterData();
    const { routers, loading, error } = routerDataState;
    const [selectedRouter, setSelectedRouter] = useState<Router | null>(null);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [addRouterOpen, setAddRouterOpen] = useState(false);
    const [editRouterOpen, setEditRouterOpen] = useState(false);
    const [currentRouter, setCurrentRouter] = useState<Router | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const filteredRouters = routerType === 'all'
        ? routers
        : routers.filter(router => router.type === routerType);

    const sortedRouters = [...filteredRouters].sort((a, b) => {
        if (sortOption === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortOption === 'updatedAt') {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        }
        return 0;
    });

    const filteredAndSortedRouters = sortedRouters.filter(router => {
        return router.name.toLowerCase().includes(filterText.toLowerCase());
    });

    // Infinite scroll handler
    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setVisibleCount(prev => Math.min(prev + PAGE_SIZE, sortedRouters.length));
        }
    }, [sortedRouters.length]);

    useEffect(() => {
        setVisibleCount(PAGE_SIZE); // Reset on filter/sort change
    }, [routerType, sortOption, routers]);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        };
        const observer = new window.IntersectionObserver(handleObserver, option);
        const currentLoadMoreRef = loadMoreRef.current;
        if (currentLoadMoreRef) {
            observer.observe(currentLoadMoreRef);
        }
        return () => {
            if (currentLoadMoreRef) {
                observer.unobserve(currentLoadMoreRef);
            }
        };
    }, [handleObserver, sortedRouters.length]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleRouterDetails = (router: Router) => {
        setSelectedRouter(router);
    };

    const handleAddRouter = (newRouter: Router) => {
        dispatch({ type: 'ADD_ROUTER', payload: newRouter });
        setAddRouterOpen(false);
        setCurrentRouter(null);
    };

    const handleDeleteRouter = (router: Router) => {
        dispatch({ type: 'DELETE_ROUTER', payload: router.id });
    };

    const handleEditDetails = (router: Router) => {
        setCurrentRouter(router);
        setEditRouterOpen(true);
    };

    const handleUpdateRouter = (updatedRouter: Router) => {
        dispatch({ type: 'UPDATE_ROUTER', payload: updatedRouter });
        setEditRouterOpen(false);
    };

    return (
        <>
            <div className="action-panel">
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => setAddRouterOpen(true)}
                    sx={{ margin: 2 }}
                    className="add-router-button"
                >
                    Add Router
                </Button>
                <AddRouter 
                    open={addRouterOpen} 
                    showModal={setAddRouterOpen}
                    handleAddRouter={handleAddRouter} />
            </div>
            <div className="router-list">
                {filteredAndSortedRouters.slice(0, visibleCount).map((router: Router) => (
                    <RouterCard 
                        key={router.id} 
                        router={router} 
                        handleDetails={handleRouterDetails} 
                        handleEditDetails={handleEditDetails}
                        handleDeleteRouter={handleDeleteRouter}
                    />
                ))}
                {visibleCount < sortedRouters.length && (
                    <div ref={loadMoreRef} style={{ height: 1 }} />
                )}
                {selectedRouter && (
                    <RouterDetails
                        open={!!selectedRouter}
                        selectedRouter={selectedRouter}
                        setSelectedRouter={() => setSelectedRouter(null)}
                    />
                )}
            </div>
            <EditRouterDetails
                open={editRouterOpen}
                showModal={setEditRouterOpen}
                currentRouter={currentRouter ?? undefined}
                handleUpdateRouter={handleUpdateRouter}
            />
        </>
    );
};

export default RouterList;