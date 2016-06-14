import React from "react";
import Reflux from "reflux";
import { hashHistory } from "react-router";

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentReply from 'material-ui/svg-icons/content/reply';
import Paper from 'material-ui/Paper';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Header } from "../components/header.jsx";

const style = {
	height: 300,
	width: '100%',
	marginTop: '20px',
	paddingTop: '50px',
	textAlign: 'center',
	display: 'inline-block',
};

export const AboutContainer = React.createClass({
	getInitialState: function(){
		return {};
	},
	childContextTypes: {
    	muiTheme: React.PropTypes.object.isRequired,
    },
    getChildContext: function(){
    	return { muiTheme: getMuiTheme(baseTheme) };
    },
    goBack: function(tab){
    	hashHistory.push({pathname: '/', state: {select: tab.props.value}});
    },
	render: function(){
		var header = (<Header selectedTab={'about'} 
						 tabs={ [{label: "Province", onActive: this.goBack, value: 'province'}, 
						 	     {label: "City", onActive: this.goBack, value: 'city'},
						 	     {label: "About", onActive: null, value: 'about'}] } />);

		return (
			<div>
		        {header}
    			<Paper style={style} zDepth={2} >
    				About 
    			</Paper>
		    </div>
		);
	}  
});