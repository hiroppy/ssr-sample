import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Main } from '../templates/Main';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Muli', sans-serif;
    margin: 0;
  }
`;

export interface Props {
  load: () => void;
}

// like App-Shell of PWA
export class App extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    props.load();
  }

  render() {
    return (
      <Main>
        <GlobalStyle />
        {this.props.children}
      </Main>
    );
  }
}
