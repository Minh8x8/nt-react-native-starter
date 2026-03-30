import {useEffect, useMemo, useCallback} from 'react';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';

import {Product} from '../types/product';
import {
  loadWishlist,
  selectWishlist,
  selectWishlistIds,
  selectWishlistLoading,
  toggleWishlist,
} from '../store/wishlist/wishlistSlice';
import {AppDispatch} from '../store/store';

export const useWishlist = (userId?: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const wishlist = useSelector(selectWishlist);
  const wishlistIds = useSelector(selectWishlistIds);
  const loading = useSelector(selectWishlistLoading);

  useEffect(() => {
    if (userId) {
      dispatch(loadWishlist(userId));
    }
  }, [dispatch, userId]);

  const toggle = useCallback(
    (product: Product) => {
      if (!userId) {
        Toast.show({
          type: 'info',
          text1: 'Please sign in to save items',
        });
        return;
      }
      dispatch(toggleWishlist({userId, product}))
        .unwrap()
        .then(result => {
          Toast.show({
            type: 'success',
            text1: result.saved ? 'Saved to wishlist' : 'Removed from wishlist',
            text2: product.name,
          });
        });
    },
    [dispatch, userId],
  );

  const refresh = useCallback(() => {
    if (userId) {
      dispatch(loadWishlist(userId));
    }
  }, [dispatch, userId]);

  return useMemo(
    () => ({
      wishlist,
      wishlistIds,
      loading,
      toggleWishlist: toggle,
      refresh,
    }),
    [wishlist, wishlistIds, loading, toggle, refresh],
  );
};
