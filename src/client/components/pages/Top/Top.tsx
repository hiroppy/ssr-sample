import * as React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Head } from '../../Head';
import { OrganizationsBox } from '../../OrganizationsBox';
import { ErrorProps, PageComponentWithError } from '../../../hocs/PageComponentWithError';
import { Author } from '../../../../graphql/schema';

export interface Props extends ErrorProps {
  load: () => void;
}

const GET_AUTHOR = gql`
  query {
    author {
      name
      blog
      avatar_url
    }
  }
`;

const Icon = styled.img`
  border-radius: 50%;
  height: 120px;
  width: 120px;
`;

class GetAuthorQuery extends Query<{ author: Author }> {}

class TopComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    props.load();
  }

  render() {
    return (
      <React.Fragment>
        <Head title="top" />
        <OrganizationsBox />
        <GetAuthorQuery query={GET_AUTHOR}>
          {({ loading, error, data }) => (
            <React.Fragment>
              {error || loading ? <p>{error ? `Error! ${error.message}` : 'loading...'}</p> : null}
              {data && data.author && (
                <div>
                  <h3>Author</h3>
                  <p>{data.author.name}</p>
                  <a href={data.author.blog} target="_blank" rel="noopener noreferrer">
                    {data.author.blog}
                  </a>
                  <Icon src={data.author.avatar_url} />
                </div>
              )}
            </React.Fragment>
          )}
        </GetAuthorQuery>
        <p>DOTENV_TYPE: {process.env.DOTENV_TYPE}</p>
      </React.Fragment>
    );
  }
}

export const Top = PageComponentWithError<Props>()(TopComponent);
