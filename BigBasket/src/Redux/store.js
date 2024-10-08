import {
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
  } from "redux";
  import {thunk} from "redux-thunk";
  import { productReducer } from "./Product/reducer";
  const rootReducer = combineReducers({
    products: productReducer,
  });
  
  export const store = createStore(rootReducer, applyMiddleware(thunk));
  
  console.log("State",store.getState())