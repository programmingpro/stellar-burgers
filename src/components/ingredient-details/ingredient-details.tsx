import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useParams } from 'react-router-dom';
import { getIngredientsState } from '../../services/slices/ingredientsSlice';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(getIngredientsState);
  const { id } = useParams();
  const data = ingredients.find(function (item) {
    return item._id === id;
  });

  if (!data) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={data} />;
};
