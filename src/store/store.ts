import { combineReducers, createStore } from "redux";
import reducerTictac from "./reducerTictac/reducerTictac.ts";

const rootReducer = combineReducers({
    tictac: reducerTictac
})

const store = createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>;
export default store