import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Props, Error as ErrorComponent } from '../../components/pages/Error';
import { loadErrorPage } from '../../actions/pages';

const mapStateToProps = () => ({
  status: 404
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: () => {
    dispatch(loadErrorPage());
  }
});

export const NotFound = connect(
  mapStateToProps,
  mapDispatchToProps
)<Props & { store?: unknown }>(ErrorComponent);
