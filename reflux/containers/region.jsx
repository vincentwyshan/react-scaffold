import React from "react";
import Reflux from "reflux";
import { hashHistory } from "react-router";

import {Tabs, Tab} from 'material-ui/Tabs';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import {RegionStore} from "../stores/region.js";
import {RegionActions} from "../actions/region.js";



export const RegionContainer = React.createClass({
	mixins: [ Reflux.connect(RegionStore,"data") ],
	getInitialState: function(){
		return {
			selectedTab: 'province'
		};
	},
	childContextTypes: {
    	muiTheme: React.PropTypes.object.isRequired,
    },
    componentDidMount: function(){
    	RegionActions.fetch('/regiondata/' + this.state.selectedTab, {});
    },
    getChildContext: function(){
    	return { muiTheme: getMuiTheme(baseTheme) };
    },
    handleTabActive: function(tab){
    	this.setState({
    		selectedTab: tab.props.value
    	});
    	RegionActions.fetch('/regiondata/' + tab.props.value, {});
    },
    handleTabAbout: function(tab){
    	this.setState({
    		selectedTab: tab.props.value
    	});
		hashHistory.push('/about'); 
    },
	render: function(){
		var table = this.state.data.data.map((row)=>{
			var index = this.state.data.data.indexOf(row);
			return (
				<TableRow key={index}>
			        <TableRowColumn>{index}</TableRowColumn>
			        <TableRowColumn>{row.name}</TableRowColumn>
			        <TableRowColumn>{row.value}</TableRowColumn>
			    </TableRow>
			);
		});
		table = (
			<Table>
			    <TableHeader>
			      <TableRow>
			        <TableHeaderColumn>ID</TableHeaderColumn>
			        <TableHeaderColumn>Name</TableHeaderColumn>
			        <TableHeaderColumn>Value</TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
			    <TableBody>
			    	{table}
			    </TableBody>
			</Table>
		);
		if(this.state.data.status == 'PENDING'){
			table = (
				<RefreshIndicator
			      size={40}
			      left={10}
			      top={0}
			      status="loading"
			      style={{marginTop: '98px', marginLeft: 'calc(50% - 20px)'}}
			    />);
		}
		return (
			<div>
			  <Tabs value={this.state.selectedTab}>
			    <Tab label="Province" onActive={this.handleTabActive} value={'province'}></Tab>
			    <Tab label="City" onActive={this.handleTabActive} value={'city'}></Tab>
			    <Tab label="About" onActive={this.handleTabAbout} value={'about'}></Tab>
			  </Tabs>	
			  {table}
			</div>);
	}
});