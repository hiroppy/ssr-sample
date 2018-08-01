import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { Header as HeaderComponent } from '../../components/Header';

const mapStateToProps = (state: State) => ({
  userName: state.users.name,
  orgName: state.orgs.name
});

export const Header = connect(mapStateToProps)(HeaderComponent);
