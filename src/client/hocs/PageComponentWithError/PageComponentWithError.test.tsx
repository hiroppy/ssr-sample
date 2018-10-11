import * as React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ErrorProps, PageComponentWithError } from './PageComponentWithError';

const Hello = ({ error }: ErrorProps) => <p>hello</p>;

test('should not render errors', () => {
  // const tree = PageComponentWithError<ErrorProps>()(Hello);
  // expect(toJson(mount(tree))).toMatchSnapshot();
});
