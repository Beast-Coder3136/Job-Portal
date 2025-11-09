
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice.js";
import applicationSlice from "./applicationSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from "./authSlilce";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    auth:authSlice,
    jobs:jobSlice,
    company : companySlice,
    applications : applicationSlice 
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const appStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export default appStore;