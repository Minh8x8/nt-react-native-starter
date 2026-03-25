import {productService} from './../services/product-service';
import {useQuery} from '@tanstack/react-query';

export const useProducts = ({
  searchQuery,
  unitPrice,
}: {
  searchQuery?: string;
  unitPrice?: number;
}) => {
  return useQuery({
    queryKey: ['products', searchQuery, unitPrice],

    queryFn: () =>
      productService.getProducts({
        searchQuery:
          searchQuery === '' || searchQuery === undefined
            ? undefined
            : searchQuery,
        unitPrice,
      }),

    staleTime: 1000 * 60 * 5,
  });
};
