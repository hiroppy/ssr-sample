import * as React from 'react';
import { injectGlobal } from 'styled-components';
import { Main } from '../components/templates/Main';

injectGlobal`
  body {
    margin: 0
  }
`;

interface Props {
  name: string;
  children: React.ReactNode;
  setUserName: () => void;
}

// like App-Shell of PWA
export class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    // common processing only at initialization
    if (this.props.name === '') this.props.setUserName();
  }

  render() {
    return <Main>{this.props.children}</Main>;
  }
}
