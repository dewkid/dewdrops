// This is a high level view of the state object in the store
export default {
  dewdrops: [],
  comments: [],
  users: [],
  currentDewdrop: {},
  currentUser: { id: 0, name: '', loggedIn: false },
  apiCallsInProgress: 0
};
