import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { Props, App as AppComponent } from '../../components/App';
import { setUserName } from '../../actions/users';

const mapStateToProps = (state: State) => ({
  name: state.users.name
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUserName: (name: string) => {
    dispatch(setUserName(name));
  }
});

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)<Props & { store?: unknown }>(AppComponent);
