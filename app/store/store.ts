import {createStore, applyMiddleware, Store, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import reducer from './reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store: Store<StoreState, StoreAction> & {
  dispatch: DispatchType;
} = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
