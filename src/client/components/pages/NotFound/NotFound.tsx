import * as React from 'react';
import { Head } from '../../Head';
import { Error as Template } from '../../templates/Error';

export interface Props {
  stopSaga?: () => void;
}

export class NotFound extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    if (props.stopSaga && !process.env.IS_BROWSER) props.stopSaga();
  }

  render() {
    return (
      <React.Fragment>
        <Head title="404" />
        <Template>Page not found</Template>
      </React.Fragment>
    );
  }
}
