import { TOrder } from '@utils-types';
import { getOrderByNumber, orderSlice } from './orderSlice';

describe('Проверка редьюсера слайса order', () => {
  const initialState = {
    isLoading: false,
    error: null,
    order: null
  };
  const order: TOrder = {
    createdAt: '2025-04-15T12:37:53.940Z',
    updatedAt: '2025-04-15T12:37:54.735Z',
    _id: '67fe5321e8e61d001cec2b76',
    status: 'done',
    name: 'бургер',
    number: 7472,
    ingredients: ['bun', 'main']
  };
  test('При вызове экшена Request булевая переменная, отвечающая за текущий запрос меняется на true.', () => {
    const newState = orderSlice.reducer(
      initialState,
      getOrderByNumber.pending('7472', 7472)
    );
    expect(newState.isLoading).toBe(true);
  });
  test('При вызове экшена Success эти данные записываются в стор и store.isLoading меняется на false.', () => {
    const newState = orderSlice.reducer(
      { ...initialState, isLoading: true },
      getOrderByNumber.fulfilled(
        { orders: [order], success: true },
        '7472',
        7472
      )
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.order).toEqual(order);
  });
  test('При вызове экшена Failed и передаче в него ошибки она записывается в стор и store.isLoading меняется на false.', () => {
    const error = new Error('error');
    const newState = orderSlice.reducer(
      { ...initialState, isLoading: true },
      getOrderByNumber.rejected(error, '7472', 7472)
    );
    expect(newState.error).toBe(error.message);
  });
});
