import React from "react";
import ReactDOM from "react-dom";

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import { routes } from "./routes.jsx";
import { createMockData } from "./mock/regiondata.js";

// create mock data
createMockData();

ReactDOM.render(
	routes, document.getElementById('root')
);