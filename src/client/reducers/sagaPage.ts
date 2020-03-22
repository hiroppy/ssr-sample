import { Actions } from '../actions/fetchSaga';
import { Samples } from '../../server/responseSchema';

export type State = {
  samples: Samples;
};

export const initialState: State = {
  samples: [],
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case 'FETCH_SAGA_CODE_SUCCESS':
      return { ...state, samples: action.payload.samples };
    case 'FETCH_SAGA_CODE':
    case 'FETCH_SAGA_CODE_FAILURE':
    default:
      return state;
  }
};
