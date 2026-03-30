import {useState, useCallback, useEffect} from 'react';
import {useProducts} from '@/hooks/use-products';

export const useShopScreen = () => {
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useProducts({
    searchQuery: debouncedSearchQuery,
  });

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  return {
    products,
    isLoading,
    isError,
    isRefreshing,
    searchQuery,
    activeCategory,
    setSearchQuery,
    setActiveCategory,
    handleRefresh,
  };
};
