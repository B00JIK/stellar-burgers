import { RootState, useSelector } from '../../services/store';
import styles from './constructor-page.module.css';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import { BurgerConstructor, BurgerIngredients } from '@components';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const isIngredientsLoading = useSelector<RootState, boolean>(
    (store) => store.ingredients.isLoading
  );

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
