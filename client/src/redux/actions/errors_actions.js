import { ERROR, CLEAR_ERROR } from './type';

export const textErrorAction = (textError) => ({
  type: ERROR,
  textError,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
  textError: '',
});