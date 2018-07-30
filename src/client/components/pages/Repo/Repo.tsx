import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { State } from '../../../reducers/repos'; // TODO...
import { TextLink } from '../../atoms/TextLink';

type Params = {
  org: string;
  name: string;
};

export interface Props extends RouteComponentProps<Params> {
  fetchRepo: (obj: Params) => void;
  repo: State['repo'];
}

const Container = styled.div`
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 800px;
  margin: auto;
  text-align: center;
  padding: 50px;
`;

export class Repo extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    if (this.props.repo.url === '') this.props.fetchRepo(this.props.match.params);
  }

  render() {
    const {
      url,
      fullName,
      language,
      homepage,
      forksCount,
      issuesCount,
      stargazersCount,
      watchersCount
    } = this.props.repo;

    return (
      <Container>
        <h1>{fullName}</h1>
        <p>{language}</p>
        <p>{homepage}</p>
        <TextLink link={url}>🏠</TextLink>
        <span>🍴: {forksCount}</span>
        <span>📝: {issuesCount}</span>
        <span>🌟: {stargazersCount}</span>
        <span>👀: {watchersCount}</span>
      </Container>
    );
  }
}
