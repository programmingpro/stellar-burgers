import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getAllFeeds, getOrdersFeeds } from '../../services/slices/feedReducer';
import { useDispatch, useSelector } from '../../services/store';
export const Feed: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFeeds());
  }, []);

  const orders: TOrder[] = useSelector(getOrdersFeeds);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleFeeds = () => {
    dispatch(getAllFeeds());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleFeeds} />;
};
