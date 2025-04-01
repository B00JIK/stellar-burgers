import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  sendOrder,
  setOrderRequest,
  closeOrderModalData
} from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const isInit = useSelector((store) => store.user.isInit);
  const orderRequest = useSelector((store) => store.constructorbg.orderRequest);
  const orderModalData = useSelector(
    (store) => store.constructorbg.orderModalData
  );
  const constructorItems = useSelector(
    (store) => store.constructorbg.constructorItems
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (document.cookie === '') navigate('/login');
    if (constructorItems.bun && document.cookie !== '') {
      dispatch(setOrderRequest(true));
      const bunId = constructorItems.bun._id;
      const ingredientsIds = constructorItems.ingredients.map(
        (ingredient) => ingredient._id
      );
      const order = [bunId, ...ingredientsIds, bunId];
      dispatch(sendOrder(order));
    }
  };
  const closeOrderModal = () => {
    dispatch(setOrderRequest(false));
    dispatch(closeOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
