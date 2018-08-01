import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { Orgs as OrgsComponent } from '../../components/pages/Orgs';
import { fetchRepos, resetOrgs } from '../../actions/orgs';

const mapStateToProps = (state: State) => ({
  name: state.orgs.name,
  repos: state.orgs.repos
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRepos: (org: string) => {
    dispatch(fetchRepos(org));
  },
  resetOrgs: () => {
    dispatch(resetOrgs());
  }
});

export const Orgs = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgsComponent);
