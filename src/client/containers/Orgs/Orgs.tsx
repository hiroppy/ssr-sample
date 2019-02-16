import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { Orgs as OrgsComponent } from '../../components/pages/Orgs';
import { loadOrgsPage } from '../../actions/pages';

const mapStateToProps = (state: State) => ({
  name: state.orgs.name,
  repos: state.orgs.repos,
  error: state.pages.error,
  isFetchingRepos: state.orgs.isFetching
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: (org: string) => {
    dispatch(loadOrgsPage(org));
  }
});

export const Orgs = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgsComponent);
