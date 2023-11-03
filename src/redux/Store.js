import { createStore } from 'redux';
import RootReducers from './Rootreducers';

export function configureStore(InitialState) {
  const Store = createStore(
    RootReducers,
    InitialState,
  );
  return Store;
}
