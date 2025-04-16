import { TUser } from '@utils-types';
import { forgotPassword, getUserData, loginUser, logoutUser, registerUser, updateUserData, userSlice } from './userSlice';
import { TRegisterData } from '@api';

describe('Проверка редьюсера слайса user', () => {
  const initialState = {
    isInit: false,
    isLoading: false,
    user: null,
    error: null,
    token: ''
  };

  const user: TUser = {
    email: 'ivanIvanov@yandex.ru',
    name: 'Ivanov Ivan'
  };
  const registerData: TRegisterData = {
    ...user,
    password: '1234'
  }
  //!getUserData
  test('(getUserData) При вызове экшена Request булевая переменная, отвечающая за текущий запрос меняется на true.', () => {
    const newState = userSlice.reducer(initialState, getUserData.pending(''));
    expect(newState.isLoading).toBe(true);
  });
  test('(getUserData) При вызове экшена Success эти данные записываются в стор и store.isLoading меняется на false.', () => {
    const newState = userSlice.reducer(
      initialState,
      getUserData.fulfilled({ success: true, user: user }, '')
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.user).toEqual(user);
  });
  test('(getUserData) При вызове экшена Failed и передаче в него ошибки она записывается в стор и store.isLoading меняется на false.', () => {
      const error = new Error('error');  
      const newState = userSlice.reducer(
          {...initialState,
              isLoading: true
          },
          getUserData.rejected(error, '')
        );
      expect(newState.error).toBe(error.message);
    });
  //!updateUserData
  test('(updateUserData) При вызове экшена Request булевая переменная, отвечающая за текущий запрос меняется на true.', () => {
    const newState = userSlice.reducer(initialState, updateUserData.pending('', user));
    expect(newState.isLoading).toBe(true);
  });
  test('(updateUserData) При вызове экшена Success эти данные записываются в стор и store.isLoading меняется на false.', () => {
    const newState = userSlice.reducer(
      initialState,
      updateUserData.fulfilled({success: true, user: user}, '', registerData)
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.user).toEqual(user);
  });
  test('(updateUserData) При вызове экшена Failed и передаче в него ошибки она записывается в стор и store.isLoading меняется на false.', () => {
    const error = new Error('error');  
    const newState = userSlice.reducer(
        {...initialState,
            isLoading: true
        },
        updateUserData.rejected(error, '', registerData)
      );
    expect(newState.error).toBe(error.message);
  });
  //!loginUser
  test('(loginUser) При вызове экшена Request булевая переменная, отвечающая за текущий запрос меняется на true.', () => {
    const newState = userSlice.reducer(initialState, loginUser.pending('', registerData));
    expect(newState.isLoading).toBe(true);
  });
  test('(loginUser) При вызове экшена Success эти данные записываются в стор и store.isLoading меняется на false.', () => {
    const newState = userSlice.reducer(
      initialState,
      loginUser.fulfilled(user, '', {email: user.email, password: registerData.password})
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.user).toEqual(user);
  });
  test('(loginUser) При вызове экшена Failed и передаче в него ошибки она записывается в стор и store.isLoading меняется на false.', () => {
    const error = new Error('error');  
    const newState = userSlice.reducer(
        {...initialState,
            isLoading: true
        },
        loginUser.rejected(error, '', registerData)
      );
    expect(newState.error).toBe(error.message);
  });
  //!logoutUser
  test('(logoutUser) При вызове экшена Request булевая переменная, отвечающая за текущий запрос меняется на true.', () => {
    const newState = userSlice.reducer(initialState, logoutUser.pending(''));
    expect(newState.isLoading).toBe(true);
  });
  test('(logoutUser) При вызове экшена Success эти данные записываются в стор и store.isLoading меняется на false.', () => {
    const newState = userSlice.reducer(
      initialState,
      logoutUser.fulfilled(undefined, '')
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.user).toEqual(null);
  });
  test('(logoutUser)При вызове экшена Failed и передаче в него ошибки она записывается в стор и store.isLoading меняется на false.', () => {
    const error = new Error('error');  
    const newState = userSlice.reducer(
        {...initialState,
            isLoading: true
        },
        logoutUser.rejected(error, '')
      );
    expect(newState.error).toBe(error.message);
  });
  //!registerUser
  test('(registerUser) При вызове экшена Request булевая переменная, отвечающая за текущий запрос меняется на true.', () => {
    const newState = userSlice.reducer(initialState, registerUser.pending('', registerData));
    expect(newState.isLoading).toBe(true);
  });
  test('(registerUser) При вызове экшена Success эти данные записываются в стор и store.isLoading меняется на false.', () => {
    const newState = userSlice.reducer(
      initialState,
      registerUser.fulfilled(user, '', registerData)
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.user).toEqual(user);
  });
  test('(registerUser)При вызове экшена Failed и передаче в него ошибки она записывается в стор и store.isLoading меняется на false.', () => {
    const error = new Error('error');  
    const newState = userSlice.reducer(
        {...initialState,
            isLoading: true
        },
        registerUser.rejected(error, '', registerData)
      );
    expect(newState.error).toBe(error.message);
  });
});
