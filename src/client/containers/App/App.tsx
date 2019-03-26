import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { App as AppComponent } from '../../components/App';
import { loadAppProcess } from '../../actions/pages';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: () => {
    dispatch(loadAppProcess());
  }
});

export const App = connect(
  null,
  mapDispatchToProps
)(AppComponent);
