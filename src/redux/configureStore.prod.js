import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

export default function configureStore(initialState) {
  const persistConfig = {
    key: 'root',
    storage
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  let store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(thunk)
  );
  let persistor = persistStore(store);
  return { store, persistor };
}
