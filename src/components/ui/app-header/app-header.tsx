import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <BurgerIcon type={'primary'} />
          <NavLink
            className={({ isActive }) =>
              clsx(styles.link, { [styles.link_active]: isActive })
            }
            to='/'
          >
            Конструктор
          </NavLink>
        </>
        <>
          <ListIcon type={'primary'} />
          <NavLink
            className={({ isActive }) =>
              clsx(styles.link, { [styles.link_active]: isActive })
            }
            to='/feed'
          >
            Лента заказов
          </NavLink>
        </>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <ProfileIcon type={'primary'} />
        <NavLink
          className={({ isActive }) =>
            clsx(styles.link, { [styles.link_active]: isActive })
          }
          to='/profile'
        >
          {userName || 'Личный кабинет'}
        </NavLink>
      </div>
    </nav>
  </header>
);
