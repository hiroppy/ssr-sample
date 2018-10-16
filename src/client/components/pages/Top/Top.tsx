import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Head } from '../../Head';
import { ErrorProps, PageComponentWithError } from '../../../hocs/PageComponentWithError';
import { organizations } from '../../../../graphql/schema';

export interface Props extends ErrorProps {
  load: () => void;
}

const GET_ORGS = gql`
  {
    organizations {
      name
      uid
    }
  }
`;

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
        <Query query={GET_ORGS}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            return (
              <Ul>
                {(data.organizations as typeof organizations).map(({ name, uid }) => (
                  <Li key={uid}>
                    <Link to={`/orgs/${name}`}>{name}</Link>
                  </Li>
                ))}
              </Ul>
            );
          }}
        </Query>
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
