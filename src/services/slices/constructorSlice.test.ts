import { TConstructorIngredient } from '@utils-types';
import {
  addIngredient,
  constructorSlice,
  initialState,
  moveIngredientDown,
  removeIngredient
} from './constructorSlice';

describe('Проверка редьюсера слайса constructor', () => {
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

  const bun: TConstructorIngredient = {
    id: '643d69a5c3f7b9001cfa093c',
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png'
  };

  const sauce: TConstructorIngredient = {
    id: '643d69a5c3f7b9001cfa0942',
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png'
  };
  test('Обработка экшена добавления ингредиента', () => {
    const newState = constructorSlice.reducer(
      initialState,
      addIngredient(main)
    );
    expect(newState.constructorItems.ingredients.length).toBe(1);
  });
  test('Обработка экшена удаления ингредиента', () => {
    const stateWithIngredients = {
      isLoading: false,
      constructorItems: {
        bun: bun,
        ingredients: [main]
      },
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const newState = constructorSlice.reducer(
      stateWithIngredients,
      removeIngredient(main)
    );
    expect(newState.constructorItems.ingredients).toHaveLength(1);
  });
  test('Обработка экшена изменения порядка ингредиентов в начинке (moveIngredientDown)', () => {
    const stateWithIngredients = {
      isLoading: false,
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce]
      },
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const newState = constructorSlice.reducer(
      stateWithIngredients,
      moveIngredientDown(0)
    );
    expect(newState.constructorItems.ingredients[1].id).toEqual(main.id);
  });
  test('Обработка экшена изменения порядка ингредиентов в начинке (moveIngredientUp)', () => {
    const stateWithIngredients = {
      isLoading: false,
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce]
      },
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const newState = constructorSlice.reducer(
      stateWithIngredients,
      moveIngredientDown(0)
    );
    expect(newState.constructorItems.ingredients[1].id).toEqual(main.id);
  });
});
