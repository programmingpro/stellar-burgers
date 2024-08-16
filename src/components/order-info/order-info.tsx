import { FC, useMemo, useState, useEffect } from 'react';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient, TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredientsState } from '../../services/slices/ingredientsSlice';
import { getOrderByNumberApi } from '@api';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const [orderData, setOrderData] = useState({
    _id: '',
    status: '',
    name: '',
    updatedAt: '',
    number: 0,
    createdAt: '',
    ingredients: ['']
  });
  const dispatch = useDispatch();
  const { number } = useParams();

  useEffect(() => {
    getOrderByNumberApi(Number(number)).then((data) =>
      setOrderData(data.orders[0])
    );
  }, []);

  const ingredients = useSelector(getIngredientsState);

  const orderInfo = useMemo(() => {
    if (!ingredients.length || !orderData) return null;

    const date = new Date(orderData.createdAt);
    const number = orderData.number;

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (ing: TIngredientsWithCount, item) => {
        if (!ing[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            ing[item] = { ...ingredient, count: 1 };
          }
        } else {
          ing[item].count++;
        }
        return ing;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(function (ing, item) {
      return ing + item.price * item.count;
    }, 0);

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total,
      number
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
