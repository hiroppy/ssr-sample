import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import Loading from 'react-loading';
import { Head } from '../../Head';
import { State } from '../../../reducers/orgs';

export interface Props extends RouteComponentProps<{ org: string }> {
  name: State['name'];
  repos: State['repos'];
  load: (org: string) => void;
  isFetchingRepos: boolean;
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

const LoadingBox = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
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

    props.load(props.match.params.org);
  }

  render() {
    const { match, repos, isFetchingRepos } = this.props;

    return (
      <React.Fragment>
        <Head title={match.params.org} />
        <Container>
          {isFetchingRepos ? (
            <React.Fragment>
              {process.env.IS_BROWSER ? (
                <LoadingBox>
                  <Loading type="cubes" color="#333" />
                </LoadingBox>
              ) : null}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {repos.map((repo) => (
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
            </React.Fragment>
          )}
        </Container>
      </React.Fragment>
    );
  }
}
