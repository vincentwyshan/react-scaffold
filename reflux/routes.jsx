import React from "react";
import { Route, Router, IndexRoute } from "react-router";
import { hashHistory } from "react-router";

import { RegionContainer } from "./containers/region.jsx";
import { AboutContainer } from "./containers/about.jsx";

class AppContainer extends React.Component {
 	constructor(props){
     	super(props);
 	}
 	render(){
 		return this.props.children;
 	}
};

export const routes = (
     <Router history={hashHistory} >
         <Route path="/" component={AppContainer} >
             <IndexRoute component={RegionContainer} />
             <Route path="region" component={RegionContainer} />
             <Route path="about" component={AboutContainer} />
         </Route>
     </Router>
 );

