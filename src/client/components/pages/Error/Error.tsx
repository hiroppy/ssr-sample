import * as React from 'react';
import styled from 'styled-components';
import { Head } from '../../Head';
import { Error as Template } from '../../templates/Error';

export interface Props {
  load: () => void;
  status: number;
}

export class Error extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    props.load();
  }

  render() {
    const { status } = this.props;

    return (
      <React.Fragment>
        <Head title={String(status)} />
        <Template>{status}</Template>
      </React.Fragment>
    );
  }
}
