import React from 'react';
import renderer from 'react-test-renderer';
import { dewdrops } from '../../../tools/mockData';

// Component under test
import DewdropForm from '../../../src/components/dewdrops/DewdropForm';

it("sets submit button label 'Saving...' when saving is true", () => {
  const tree = renderer.create(
    <DewdropForm
      dewdrop={dewdrops[0]}
      onSave={jest.fn()}
      onChange={jest.fn()}
      onFilesDrop={jest.fn()}
      saving
      errors={{}}
    />
  );

  expect(tree).toMatchSnapshot();
});

it("sets submit button label 'Save' when saving is false", () => {
  const tree = renderer.create(
    <DewdropForm
      dewdrop={dewdrops[0]}
      onSave={jest.fn()}
      onChange={jest.fn()}
      onFilesDrop={jest.fn()}
      saving={false}
      errors={{}}
    />
  );

  expect(tree).toMatchSnapshot();
});

it('sets a caption field error when there is a caption error', () => {
  const tree = renderer.create(
    <DewdropForm
      dewdrop={{}}
      onSave={jest.fn()}
      onChange={jest.fn()}
      onFilesDrop={jest.fn()}
      saving={false}
      errors={{ caption: 'error' }}
    />
  );

  expect(tree).toMatchSnapshot();
});

it('sets an image field error when there is an image error', () => {
  const tree = renderer.create(
    <DewdropForm
      dewdrop={{}}
      onSave={jest.fn()}
      onChange={jest.fn()}
      onFilesDrop={jest.fn()}
      saving={false}
      errors={{ image: 'error' }}
    />
  );

  expect(tree).toMatchSnapshot();
});
