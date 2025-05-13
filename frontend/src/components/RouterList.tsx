import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouterData } from '../context/RoutersDataContext';
import { useRouterFilter } from '../context/RoutersFilterContext';
import RouterDetails from './RouterDetails';
import RouterCard from './RouterCard';

interface Router {
    id: string;
    name: string;
    type: string;
    updatedAt: string;
}

const PAGE_SIZE = 20;

const RouterList = () => {
    const { state } = useRouterFilter();
    const { routerType, sortOption } = state;
    const { routers, loading, error } = useRouterData();
    const [selectedRouter, setSelectedRouter] = useState<Router | null>(null);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const handleRouterDetails = (router: Router) => {
        setSelectedRouter(router);
    };

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
        if (loadMoreRef.current) observer.observe(loadMoreRef.current);
        return () => {
            if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
        };
    }, [handleObserver, sortedRouters.length]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="router-list">
                {sortedRouters.slice(0, visibleCount).map((router: Router) => (
                    <RouterCard key={router.id} router={router} handleDetails={handleRouterDetails} />
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
        </>
    );
};

export default RouterList;