import { TConstructorIngredient, TOrder } from '@utils-types';

export type TConstructorItem = {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
};

export type BurgerConstructorUIProps = {
  constructorItems: TConstructorItem;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
