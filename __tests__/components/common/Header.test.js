import React from 'react';
import renderer from 'react-test-renderer';
// Component to be tested
import { Header } from '../../../src/components/common/Header';
import { users } from '../../../tools/mockData';

it('Header snapshot', () => {
  const tree = renderer.create(
    <Header currentUser={{ id: 1, name: 'test' }} users={users} actions={{}} />
  );

  expect(tree).toMatchSnapshot();
});
