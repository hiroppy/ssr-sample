import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Head } from '.';

const stories = storiesOf('components/Head', module);

class Component extends React.Component<{}, { title: string }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      title: ''
    };
  }

  componentDidMount() {
    // TODO: fix
    const title = document.querySelector('title')!.text;

    this.setState({ title });
  }

  render() {
    return (
      <>
        <Head title="Storybook" />
        <p>title: {this.state.title}</p>
      </>
    );
  }
}

stories.add('default', () => <Component />);
