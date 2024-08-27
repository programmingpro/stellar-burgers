import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { useDispatch } from '../../services/store';
import { BurgerConstructorElementProps } from './type';
import {
  deleteIngredient,
  moveIngredient
} from '../../services/slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const disp = useDispatch();
    const handleMoveUp = () => {
      disp(moveIngredient({ direction: 'up', id: ingredient.id }));
    };
    const handleMoveDown = () => {
      disp(moveIngredient({ direction: 'down', id: ingredient.id }));
    };

    const handleClose = () => {
      disp(deleteIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
        ingredient={ingredient}
        index={index}
      />
    );
  }
);
