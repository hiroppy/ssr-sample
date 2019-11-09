import React from 'react';
import { act, render, getAllByTestId, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import Apollo from '.';
import { GET_SAMPLES, ADD_LIKE } from './Apollo';
import { initialState } from '../../../reducers';
import * as actions from '../../../actions/pages';
import { apolloSamples } from '../../../../server/responseSchema';

// https://trojanowski.dev/apollo-hooks-testing-without-act-warnings/
async function wait(ms = 0) {
  await act(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
}

const getSamplesMock = {
  request: {
    query: GET_SAMPLES,
    variables: {
      maxLength: 0
    }
  },
  result: { data: { samples: apolloSamples } }
};

const addLikeMock = {
  request: {
    query: ADD_LIKE,
    variables: {
      id: 1
    }
  },
  result: { data: { addLike: { id: 1 } } }
};

function run(state = {}, mocks = []) {
  const mockStore = configureStore()({ ...initialState, ...state });

  return render(
    <Provider store={mockStore}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/apollo']} keyLength={0}>
          <Apollo />
        </MemoryRouter>
      </MockedProvider>
    </Provider>
  );
}

test('should call loadApolloPage when IS_BROWSER is false', async () => {
  const loadSagaPage = jest.spyOn(actions, 'loadApolloPage');

  {
    process.env.IS_BROWSER = 'true';

    run({}, [getSamplesMock]);

    await wait();

    expect(loadSagaPage).not.toBeCalled();

    delete process.env.IS_BROWSER;
  }

  {
    run();

    await wait();

    expect(loadSagaPage).toBeCalled();
  }
});

test('should run mutation using ADD_LIKE', async () => {
  // getSamples(init) -> addLike(click a button) -> getSamples(refetch by mutation)
  const { container } = run({}, [getSamplesMock, addLikeMock, getSamplesMock]);

  await wait();

  const [box] = getAllByTestId(container, 'like-button');

  fireEvent.click(box);

  await wait();
});
