import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import rootReducer  from "./modules";
import logger from "redux-logger";
//npm install redux-logger
//npm install redux-devtools-extension
//npm install react-router-dom
// 콤바인리듀서로 여러개의 리듀서 등록하기

import { BrowserRouter } from "react-router-dom";



import ReduxThunk from "redux-thunk";
// redux-thunk 사용하기 위해 함수를 디스패치 가능. dispatch 와 getState를 파라미터로 받아와줘야함.

const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(ReduxThunk,logger))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
