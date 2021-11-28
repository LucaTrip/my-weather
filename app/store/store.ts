import {createStore, applyMiddleware, Store} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import reducer from './reducer';
import {DispatchType, StoreAction, StoreState} from './type';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cities'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store: Store<StoreState, StoreAction> & {
  dispatch: DispatchType;
} = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
