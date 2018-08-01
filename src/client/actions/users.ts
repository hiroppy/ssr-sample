import { Action } from 'redux';

export type Actions = SetUserName;

export interface SetUserName extends Action {
  type: 'SET_USER_NAME';
  payload: {
    name: string;
  };
}

export const setUserName = (name: SetUserName['payload']['name']): SetUserName => ({
  type: 'SET_USER_NAME',
  payload: {
    name
  }
});
