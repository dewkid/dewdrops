import { createStore } from 'redux';
import rootReducer from '../../../src/redux/reducers';
import initialState from '../../../src/redux/reducers/initialState';
import * as dewdropActions from '../../../src/redux/actions/dewdropActions';

it('Should handle creating dewdrops', function() {
  // arrange
  const store = createStore(rootReducer, initialState);
  const dewdrop = {
    caption: 'Good test'
  };

  // act
  const action = dewdropActions.createDewdropSuccess(dewdrop);
  store.dispatch(action);

  // assert
  const createdDewdrop = store.getState().dewdrops[0];
  expect(createdDewdrop).toEqual(dewdrop);
});
