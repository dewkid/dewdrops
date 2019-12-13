import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
//import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for redux devtools

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['currentUser'] // only currentUser will be persisted
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  let store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)) // reduxImmutableStateInvariant() warns us if state is accidentally mutated
  );
  let persistor = persistStore(store);
  return { store, persistor };
}
