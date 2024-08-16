import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import {
  getOrdersFeeds,
  getTotalFeeds,
  getTotalTodayFeeds
} from '../../services/slices/feedReducer';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const total = useSelector(getTotalTodayFeeds);
  const orders = useSelector(getOrdersFeeds);
  const feed = useSelector(getTotalFeeds);
  const ready = getOrders(orders, 'done');
  const pending = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={ready}
      pendingOrders={pending}
      feed={{
        totalToday: total,
        total: feed
      }}
    />
  );
};
