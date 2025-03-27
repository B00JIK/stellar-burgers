import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <Link to={'/'}>
            <BurgerIcon type={'primary'} />
          </Link>
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
        </>
        <>
          <Link to={'/feed'}>
            <ListIcon type={'primary'} />
          </Link>
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </>
      </div>
      <div className={styles.logo}>
        <Link to={'/'}>
          <Logo className='' />
        </Link>
      </div>
      <div className={styles.link_position_last}>
        <Link to={'/profile'}>
          <ProfileIcon type={'primary'} />
        </Link>
        <p className='text text_type_main-default ml-2'>
          {userName || 'Личный кабинет'}
        </p>
      </div>
    </nav>
  </header>
);
