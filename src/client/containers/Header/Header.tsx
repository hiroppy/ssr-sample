import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { Header as HeaderComponent } from '../../components/organisms/Header';

const mapStateToProps = (state: State) => ({
  name: state.users.name
});

export const Header = connect(mapStateToProps)(HeaderComponent);
