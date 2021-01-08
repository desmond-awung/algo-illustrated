// reference https://stackoverflow.com/a/37538814/12008034
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

export default function configureStore(initialState){
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
