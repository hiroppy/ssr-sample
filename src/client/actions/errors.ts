import { Action } from 'redux';

export type Actions = AppError;

export interface AppError extends Action {
  type: 'APP_ERROR';
  payload: {
    err: Error;
  };
}

export const appError = (err: AppError['payload']['err']): AppError => ({
  type: 'APP_ERROR',
  payload: {
    err
  }
});
