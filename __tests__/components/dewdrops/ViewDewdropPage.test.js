// We made the mapStateToProps and mapDispatchToProps methods public,
// so they can now be imported in the test
import { mapStateToProps } from '../../../src/components/dewdrops/ViewDewdropPage';

describe('ViewDewdropsPage', () => {
  it('should show the correct user name for the specified dewdrop userid', () => {
    const initialState = {
      users: [
        { id: 1, name: 'Robin' },
        { id: 2, name: 'Dave' }
      ],
      comments: [],
      currentDewdrop: { id: 1, userid: 2 }
    };

    // Just call the method directly passing in sample data
    // to make sure it does what it's supposed to
    expect(mapStateToProps(initialState).currentDewdrop.userName).toEqual(
      'Dave'
    );
  });

  it('should show the correct user name for the specified comment userid', () => {
    const initialState = {
      users: [
        { id: 1, name: 'Robin' },
        { id: 2, name: 'Dave' }
      ],
      comments: [{ id: 1, userid: 2 }],
      currentDewdrop: {}
    };

    // Just call the method directly passing in sample data
    // to make sure it does what it's supposed to
    expect(mapStateToProps(initialState).comments[0].userName).toEqual('Dave');
  });
});
