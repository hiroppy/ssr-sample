import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { loadApolloPage } from '../../../actions/pages';
import { Head } from '../../Head';
import { CodeSamplesBox } from '../../CodeSamplesBox';
import { Samples } from '../../../../server/responseSchema';

export const GET_SAMPLES = gql`
  query getSamples($maxLength: Int) {
    samples(maxLength: $maxLength) {
      id
      name
      code
      likeCount
      description
    }
  }
`;

export const ADD_LIKE = gql`
  mutation addLike($id: Int) {
    addLike(id: $id) {
      id
    }
  }
`;

export const Apollo = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const maxLength = new URLSearchParams(search).get('max');
  const { loading: queryLoading, error: queryError, data: queryData } = useQuery<{
    samples: Samples;
  }>(GET_SAMPLES, { variables: { maxLength: Number(maxLength) } });
  const [
    addLike,
    { loading: mutationLoading, error: mutationError, data: mutationData }
  ] = useMutation(ADD_LIKE, {
    // need to optimize this because it's better to avoid fetching all data
    refetchQueries: [{ query: GET_SAMPLES, variables: { maxLength: Number(maxLength) } }]
  });
  const like = useCallback((id: number) => {
    addLike({ variables: { id } });
    // if you want to use a local state variable, you have to specify it to `[]` because React captures this function
  }, []);

  // stop saga on Node.js
  if (!process.env.IS_BROWSER) {
    dispatch(loadApolloPage());
  }

  return (
    <>
      <Head title="apollo-page" />
      <p>query: get all samples</p>
      <p>mutation: add a like count</p>
      {queryLoading && <p>loading...</p>}
      {queryError && <p>error...</p>}
      {queryData && <CodeSamplesBox samples={queryData.samples} addLike={like} />}
    </>
  );
};
