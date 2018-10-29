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
        <p>DOTENV_TYPE: {process.env.DOTENV_TYPE}</p>
      </React.Fragment>
    );
  }
}

export const Top = PageComponentWithError<Props>()(TopComponent);
