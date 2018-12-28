import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Query, Mutation, MutationFunc } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Organizations } from '../../../graphql/schema';

interface State {
  currentValue: string;
}

const GET_ORGS = gql`
  query {
    organizations {
      name
      uid
    }
  }
`;

const ADD_ORG = gql`
  mutation addOrganization($name: String!) {
    addOrganization(name: $name) {
      name
      uri
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

const A = styled(Link)`
  color: #333;
  text-decoration: none;
`;

const InputBox = styled(Li)`
  display: flex;
  justify-content: flex-end;
`;

class GetOrgsQuery extends Query<{ organizations: Organizations }> {}

export class OrganizationsBox extends React.PureComponent<unknown, State> {
  state = { currentValue: '' };

  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ currentValue: e.currentTarget.value });
  };

  onSubmit = (addOrganization: MutationFunc) => {
    addOrganization({ variables: { name: this.state.currentValue } });
    this.setState({ currentValue: '' });
  };

  render() {
    return (
      <GetOrgsQuery query={GET_ORGS}>
        {({ loading, error, data }) => (
          <Ul>
            {error || loading ? <p>{error ? `Error! ${error.message}` : 'loading...'}</p> : null}
            {data &&
              data.organizations &&
              data.organizations.map(({ name, uid }) => (
                <Li key={uid}>
                  <A to={`/orgs/${name}`}>{name}</A>
                </Li>
              ))}
            {/* refetchQueries: GET_ORGS will update when Mutation processing is over */}
            <Mutation mutation={ADD_ORG} refetchQueries={[{ query: GET_ORGS }]}>
              {(addOrganization, { error }) => (
                <React.Fragment>
                  {error && <p>{`Error! ${error.message}`}</p>}
                  <InputBox>
                    <input onChange={this.onChange} value={this.state.currentValue} />
                    <button onClick={() => this.onSubmit(addOrganization)}>Add</button>
                  </InputBox>
                </React.Fragment>
              )}
            </Mutation>
          </Ul>
        )}
      </GetOrgsQuery>
    );
  }
}
