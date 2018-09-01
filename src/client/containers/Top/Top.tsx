import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Props, Top as TopComponent } from '../../components/pages/Top';
import { loadTopPage } from '../../actions/pages';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: () => {
    dispatch(loadTopPage());
  }
});

export const Top = connect(
  null,
  mapDispatchToProps
)<Props & { store?: unknown }>(TopComponent);
