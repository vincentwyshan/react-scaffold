import React from "react";
import { hashHistory } from "react-router";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Header } from "../components/header.jsx";
import * as RegionActions from '../actions/region.js';



class RegionContainer extends React.Component{
	constructor(props){
		super(props);

		var select = 'province';
		if(this.props.location.state.select != null){
			select = this.props.location.state.select;
		}
		this.state = {
			selectedTab: select
		};

		this.handleTabActive = this.handleTabActive.bind(this);
		this.handleTabAbout = this.handleTabAbout.bind(this);
	}
	static get childContextTypes(){
    	return {
    		muiTheme: React.PropTypes.object.isRequired,
    	};
    }
    getChildContext(){
    	return { muiTheme: getMuiTheme(baseTheme) };
    }
    componentDidMount(){
    	this.props.actions.fetchRegion('/regiondata/' + this.state.selectedTab, {});
    }
    handleTabActive(tab){
    	this.setState({
    		selectedTab: tab.props.value
    	});
    	this.props.actions.fetchRegion('/regiondata/' + this.state.selectedTab, {});
    }
    handleTabAbout(tab){
    	this.setState({
    		selectedTab: tab.props.value
    	});
		hashHistory.push('/about'); 
    }
	render(){
		var table = this.props.data.data.map((row)=>{
			var index = this.props.data.data.indexOf(row);
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
		if(this.props.data.status == 'PENDING'){
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
}

RegionContainer.propTypes = {
	data: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  	return {
    	data: state.data
  	};
};

function mapDispatchToProps(dispatch) {
  	return {
    	actions: bindActionCreators(RegionActions, dispatch)
  	};
}

export default connect(
  	mapStateToProps,
  	mapDispatchToProps
)(RegionContainer);