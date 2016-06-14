import React from "react";
import Reflux from "reflux";
import { hashHistory } from "react-router";

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentReply from 'material-ui/svg-icons/content/reply';
import Paper from 'material-ui/Paper';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const style = {
	height: 300,
	width: 'calc(100% - 100px)',
	margin: 50,
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
    goBack: function(){
    	hashHistory.push('/');
    },
	render: function(){
		return (
			<div>
		        <FloatingActionButton mini={true} onMouseUp={this.goBack}>
      				<ContentReply/>
    			</FloatingActionButton>
    			<Paper style={style} zDepth={2} >
    				About 
    			</Paper>
		    </div>
		);
	}  
});