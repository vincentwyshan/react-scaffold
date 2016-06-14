import React from "react";
import Reflux from "reflux";
import { hashHistory } from "react-router";

import { Tabs, Tab } from 'material-ui/Tabs';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const Header = React.createClass({
	childContextTypes: {
    	muiTheme: React.PropTypes.object.isRequired,
    },
    getChildContext: function(){
    	return { muiTheme: getMuiTheme(baseTheme) };
    },
 	render: function(){
 		var tabs = this.props.tabs.map( tab => {
 			return <Tab key={'tab-' + this.props.tabs.indexOf(tab)} label={tab.label} onActive={tab.onActive} value={tab.value}/>;
 		});
 		return (
			<Tabs value={this.props.selectedTab}>
			    {tabs}
			</Tabs>	
 		);
 	} 
 });