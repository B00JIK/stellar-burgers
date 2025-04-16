import { expect, test } from '@jest/globals';
import { rootReducer } from './store';
import store from './store';

describe('Проверка правильной инициализации rootReducer', () => {
  test('Проверка корректного возвращения начального состояния', () => {
    const previousStore = store.getState();
    const action = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, action);

    expect(initialState).toEqual(previousStore);
  });
});
