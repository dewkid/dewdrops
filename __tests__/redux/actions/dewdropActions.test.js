import * as dewdropActions from '../../../src/redux/actions/dewdropActions';
import * as types from '../../../src/redux/actions/actionTypes';
import { dewdrops } from '../../../tools/mockData';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('Load Dewdrops Thunk', () => {
    it('should create BEGIN_API_CALL and LOAD_DEWDROPS_SUCCESS when loading dewdrops', () => {
      fetchMock.mock('*', {
        body: dewdrops,
        headers: { 'content-type': 'application/json' }
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_DEWDROPS_SUCCESS, dewdrops }
      ];

      const store = mockStore({ dewdrops: [] });
      return store.dispatch(dewdropActions.loadDewdrops()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe('createDewdropsSuccess', () => {
  it('should create a CREATE_DEWDROP_SUCCESS action', () => {
    //arrange
    const dewdrop = dewdrops[0];
    const expectedAction = {
      type: types.CREATE_DEWDROP_SUCCESS,
      dewdrop
    };

    //act
    const action = dewdropActions.createDewdropSuccess(dewdrop);

    //assert
    expect(action).toEqual(expectedAction);
  });
});
