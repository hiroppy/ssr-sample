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
  padding: 0 15px;
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

const InfoBox = styled.div`
  display: flex;
  font-size: 1.3rem;
  margin: 15px;
  justify-content: space-around;
`;

const InfoItem = styled.div`
  flex-direction: column;
  display: flex;
  flex: 1;
`;

const Info = ({ icon, num }: { icon: string; num: number }) => (
  <InfoItem>
    <span>{icon}</span>
    <span>{num}</span>
  </InfoItem>
);

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
              <InfoBox>
                <Info icon="🌟" num={repo.stargazersCount} />
                <Info icon="👀" num={repo.watchersCount} />
              </InfoBox>
              <InfoBox>
                <Info icon="🍴" num={repo.forksCount} />
                <Info icon="📝" num={repo.issuesCount} />
              </InfoBox>
            </Card>
          ))}
        </Container>
      </React.Fragment>
    );
  }
}
