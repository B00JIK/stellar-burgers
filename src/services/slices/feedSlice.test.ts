import { TOrder } from '@utils-types';
import { feedSlice, getFeed, getProfileOrders } from './feedSlice';

describe('Проверка редьюсера слайса feed', () => {
  const initialState = {
    isLoading: false,
    orders: [],
    error: null,
    feed: {
      total: 0,
      totalToday: 0
    }
  };
  const orderFeed: TOrder[] = [
    {
      createdAt: '2025-04-15T12:37:53.940Z',
      updatedAt: '2025-04-15T12:37:54.735Z',
      _id: '67fe5321e8e61d001cec2b76',
      status: 'done',
      name: 'бургер',
      number: 7472,
      ingredients: ['bun', 'main']
    },
    {
      createdAt: '2025-04-15T12:37:53.940Z',
      updatedAt: '2025-04-15T12:37:54.735Z',
      _id: '67fe5321e8e61d001cec2b77',
      status: 'done',
      name: 'бургер',
      number: 7473,
      ingredients: ['bun', 'main']
    }
  ];
  test('(getFeed) При вызове экшена Request булевая переменная, отвечающая за текущий запрос меняется на true.', () => {
    const newState = feedSlice.reducer(initialState, getFeed.pending(''));
    expect(newState.isLoading).toBe(true);
  });
  test('(getProfileOrders) При вызове экшена Request булевая переменная, отвечающая за текущий запрос меняется на true.', () => {
    const newState = feedSlice.reducer(
      initialState,
      getProfileOrders.pending('')
    );
    expect(newState.isLoading).toBe(true);
  });
  test('(getFeed) При вызове экшена Success данные записываются в стор и store.isLoading меняется на false.', () => {
    const feedSuccess = {
      success: true,
      orders: orderFeed,
      total: 2,
      totalToday: 2
    };
    const newState = feedSlice.reducer(
      { ...initialState, isLoading: true },
      getFeed.fulfilled(feedSuccess, '')
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.orders).toEqual(orderFeed);
    expect(newState.feed.total).toEqual(feedSuccess.total);
    expect(newState.feed.totalToday).toEqual(feedSuccess.totalToday);
  });
  test('(getProfileOrders) При вызове экшена Success данные записываются в стор и store.isLoading меняется на false.', () => {
    const newState = feedSlice.reducer(
      { ...initialState, isLoading: true },
      getProfileOrders.fulfilled(orderFeed, '')
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.orders).toEqual(orderFeed);
  });
  test('(getFeed) При вызове экшена Failed и передаче в него ошибки она записывается в стор и store.isLoading меняется на false.', () => {
    const error = new Error('error');
    const newState = feedSlice.reducer(
      { ...initialState, isLoading: true },
      getFeed.rejected(error, '')
    );
    expect(newState.error).toBe(error.message);
  });
  test('(getProfileOrders) При вызове экшена Failed и передаче в него ошибки она записывается в стор и store.isLoading меняется на false.', () => {
    const error = new Error('error');
    const newState = feedSlice.reducer(
      { ...initialState, isLoading: true },
      getProfileOrders.rejected(error, '')
    );
    expect(newState.error).toBe(error.message);
  });
});
