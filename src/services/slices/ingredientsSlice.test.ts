import { TConstructorIngredient } from '@utils-types';
import { getIngredients, ingredientsSlice, initialState } from './ingredientsSlice';

describe('Проверка редьюсера слайса ingredients', () => {
  const main: TConstructorIngredient = {
    id: '643d69a5c3f7b9001cfa0941',
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
  };

  test('При вызове экшена Request булевая переменная, отвечающая за текущий запрос меняется на true.', () => {
    const newState = ingredientsSlice.reducer(
      initialState,
      getIngredients.pending('')
    );
    expect(newState.isLoading).toBe(true);
  })
  test('При вызове экшена Success эти данные записываются в стор и store.isLoading меняется на false.', () => {
    const newState = ingredientsSlice.reducer(
      initialState,
      getIngredients.fulfilled([main], '')
    );
    expect(newState.ingredients.length).toBe(1);
    expect(newState.isLoading).toBe(false);
  })
  test('При вызове экшена Failed и передаче в него ошибки она записывается в стор и store.isLoading меняется на false.', () => {
    const error = new Error('error');  
    const newState = ingredientsSlice.reducer(
        {...initialState,
            isLoading: true
        },
        getIngredients.rejected(error, '')
      );
    expect(newState.error).toBe(error.message);
  })
});
