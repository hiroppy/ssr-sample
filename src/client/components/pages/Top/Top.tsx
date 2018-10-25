import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Head } from '../../Head';
import { ErrorProps, PageComponentWithError } from '../../../hocs/PageComponentWithError';
import { Organizations, Author } from '../../../../graphql/schema';

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

const GET_AUTHOR = gql`
  {
    author {
      name
      blog
      avatar_url
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

const Icon = styled.img`
  border-radius: 50%;
  height: 120px;
  width: 120px;
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
                {(data.organizations as Organizations).map(({ name, uid }) => (
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
        <Query query={GET_AUTHOR}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            const { author }: { author: Author } = data;

            return (
              <div>
                <h3>Author</h3>
                <p>{author.name}</p>
                <a href={author.blog} target="_blank" rel="noopener noreferrer">
                  {author.blog}
                </a>
                <Icon src={author.avatar_url} />
              </div>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export const Top = PageComponentWithError<Props>()(TopComponent);
