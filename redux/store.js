import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { createFilter } from "redux-persist-transform-filter";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";

const enhancers = [];
const middleware = [reduxThunk];

const keepLoadedIn = createFilter("auth", ["token"], ["token"]);
const memberLoadedIn = createFilter("members", ["members"], ["members"]);

const persistConfig = {
  key: "patiti-test",
  storage: storage,
  whitelist: ["auth", "members"],
  transforms: [keepLoadedIn, memberLoadedIn],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export const store = createStore(persistedReducer, composedEnhancers);
export const persistor = persistStore(store);

export default store;
