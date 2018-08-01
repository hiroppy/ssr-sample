import * as React from 'react';
import { Link } from 'react-router-dom';
import { Head } from '../../Head';
import styled from 'styled-components';

const orgs = ['nodejs', 'facebook', 'google', 'microsoft'];

const Ul = styled.ul`
  box-shadow: 0px 0px 5px silver;
  margin: auto;
  padding: 0.5em 0.5em 0.5em 2em;
  width: 600px;
`;

const Li = styled.li`
  line-height: 1.5;
  padding: 0.5em 0;
`;

export const Top = () => (
  <React.Fragment>
    <Head title="top" />
    <Ul>
      {orgs.map((org) => (
        <Li key={org}>
          <Link to={`/orgs/${org}`}>{org}</Link>
        </Li>
      ))}
    </Ul>
  </React.Fragment>
);
