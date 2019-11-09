import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { loadSagaPage } from '../../../actions/pages';
import { addLike } from '../../../actions/fetchSaga';
import { getSagaCode } from '../../../selectors';
import { Head } from '../../Head';
import { CodeSamplesBox } from '../../CodeSamplesBox';

export const Saga: React.FC = () => {
  const dispatch = useDispatch();
  const samples = useSelector(getSagaCode);
  const { search } = useLocation();
  const maxLength = new URLSearchParams(search).get('max');

  if (!process.env.IS_BROWSER) {
    dispatch(loadSagaPage(maxLength));
  } else {
    useEffect(() => {
      dispatch(loadSagaPage(maxLength));
    }, []);
  }

  const like = useCallback((id: number) => {
    dispatch(addLike(id));
  }, []);

  return (
    <>
      <Head title="saga-page" />
      <p>get: get all samples</p>
      <p>post: add a like count</p>
      {samples.length !== 0 && <CodeSamplesBox samples={samples} addLike={like} />}
    </>
  );
};
