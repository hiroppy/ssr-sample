import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Top as TopComponent } from '../../components/pages/Top';
import { loadTopPage } from '../../actions/pages';
import { State } from '../../reducers';

const mapStateToProps = (state: State) => ({
  error: state.pages.error
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: () => {
    dispatch(loadTopPage());
  }
});

export const Top = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopComponent);
