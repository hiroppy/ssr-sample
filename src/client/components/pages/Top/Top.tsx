import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Head } from '../../Head';
import { ErrorProps, PageComponentWithError } from '../../../hocs/PageComponentWithError';

export interface Props extends ErrorProps {
  load: () => void;
}

const orgs = ['nodejs', 'facebook', 'google', 'microsoft'];

const Ul = styled.ul`
  box-shadow: 0px 0px 5px silver;
  margin: auto;
  max-width: 600px;
  padding: 0.5em 0.5em 0.5em 2em;
  width: 90%;
`;

const Li = styled.li`
  line-height: 1.5;
  padding: 0.5em 0;
`;

class TopComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    props.load();
  }

  render() {
    return (
      <React.Fragment>
        <Head title="top" />
        <Ul>
          {orgs.map((org) => (
            <Li key={org}>
              <Link to={`/orgs/${org}`}>{org}</Link>
            </Li>
          ))}
        </Ul>
        <div>
          <p>DOTENV_TYPE: {process.env.DOTENV_TYPE}</p>
          <p>
            Repository:
            <a href="https://github.com/hiroppy/ssr-sample" target="_blank">
              https://github.com/hiroppy/ssr-sample
            </a>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export const Top = PageComponentWithError<Props>()(TopComponent);
