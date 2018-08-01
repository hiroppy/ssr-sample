import * as React from 'react';
import { Head } from '../../Head';

export interface Props {}

export class Top extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Head title="top" />
        <div />
      </React.Fragment>
    );
  }
}
