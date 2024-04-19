import  {combineReducers, configureStore} from '@reduxjs/toolkit'
import userslice from './userslice'
import jobslice from './jobslice';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const rootreducer =combineReducers({
    user:persistReducer(persistConfig,userslice),
    job:persistReducer(persistConfig,jobslice)
  })
const store = configureStore({
    reducer:rootreducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store