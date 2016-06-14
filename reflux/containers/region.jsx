import React from "react";
import Reflux from "reflux";
import { hashHistory } from "react-router";

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Header } from "../components/header.jsx";
import { RegionStore } from "../stores/region.js";
import { RegionActions } from "../actions/region.js";



export const RegionContainer = React.createClass({
	mixins: [ Reflux.connect(RegionStore,"data") ],
	getInitialState: function(){
		var select = 'province';
		if(this.props.location.state.select != null){
			select = this.props.location.state.select;
		}
		return {
			selectedTab: select
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

		var header = (<Header selectedTab={this.state.selectedTab} 
						 tabs={ [{label: "Province", onActive: this.handleTabActive, value: 'province'}, 
						 	     {label: "City", onActive: this.handleTabActive, value: 'city'},
						 	     {label: "About", onActive: this.handleTabAbout, value: 'about'}] } />);

		return (
			<div>
			  {header}	
			  {table}
			</div>);
	}
});