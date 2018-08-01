import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { Head } from '../../Head';
import { State } from '../../../reducers/orgs';

export interface Props extends RouteComponentProps<{ org: string }> {
  name: State['name'];
  repos: State['repos'];
  fetchRepos: (org: string) => void;
  resetOrgs: () => void;
}

const Container = styled.div`
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
`;

const Card = styled.a`
  color: #333;
  background: #f5f5f5;
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: 350px;
  text-align: center;
  text-decoration: none;

  &:hover {
    color: #f5f5f5;
    background: #333;
  }
`;

const Name = styled.h1`
  word-wrap: break-word;
`;

const Info = styled.span`
  font-size: 1.5rem;
`;

export class Orgs extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    if (this.props.name === '') this.props.fetchRepos(this.props.match.params.org);
  }

  componentWillUnmount() {
    this.props.resetOrgs();
  }

  render() {
    return (
      <React.Fragment>
        <Head title={this.props.match.params.org} />
        <Container>
          {this.props.repos.map((repo) => (
            <Card key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer">
              <Name>{repo.name}</Name>
              <p>{repo.language}</p>
              <div>
                <Info>🌟: {repo.stargazersCount}</Info>
                <Info>👀: {repo.watchersCount}</Info>
              </div>
              <div>
                <Info>🍴: {repo.forksCount}</Info>
                <Info>📝: {repo.issuesCount}</Info>
              </div>
            </Card>
          ))}
        </Container>
      </React.Fragment>
    );
  }
}
