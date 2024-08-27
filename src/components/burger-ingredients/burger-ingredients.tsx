import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '@ui';
import { getIngredientsSelector } from '../../services/slices/ingredientsSlice';

import { useSelector } from '../../services/store';

export const BurgerIngredients: FC = () => {
  const { buns, mains, sauces } = useSelector(getIngredientsSelector);

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBun = useRef<HTMLHeadingElement>(null);
  const titleMain = useRef<HTMLHeadingElement>(null);
  const titleSauces = useRef<HTMLHeadingElement>(null);

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'main')
      titleMain.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'bun') titleBun.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSauces.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      titleBunRef={titleBun}
      titleMainRef={titleMain}
      titleSaucesRef={titleSauces}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
    />
  );
};
