import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import { hashHistory } from "react-router";

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import { routes } from "./routes.jsx";
import { configureStore } from "./store";
import { createMockData } from "./mock/regiondata.js";


import { Route, Router, IndexRoute } from "react-router";

// create mock data
createMockData();

let store = configureStore();

ReactDOM.render(
    <Provider store={store}>
    	<Router history={hashHistory} routes={routes} /> 
    </Provider>, 
    document.getElementById('root')
);