import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { Repo as RepoComponent } from '../../components/pages/Repo';
import { fetchRepo } from '../../actions/repos';

const mapStateToProps = (state: State) => ({
  repo: state.repos.repo
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRepo: (info: { org: string; name: string }) => {
    dispatch(fetchRepo(info));
  }
});

export const Repo = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoComponent);
