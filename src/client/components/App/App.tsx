import * as React from 'react';
import { injectGlobal } from 'styled-components';
import { Main } from '../templates/Main';

injectGlobal`
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
    return <Main>{this.props.children}</Main>;
  }
}
