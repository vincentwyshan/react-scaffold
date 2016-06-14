import React, { Component, PropTypes } from 'react';
import ReactDOM from "react-dom";

import { createStore } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';


// create action constants
const EDIT_NAME = 'EDIT_NAME';
const EDIT_AGE = 'EDIT_AGE';
const EDIT_STATUS = 'EDIT_STATUS';

// create actions
const editName = function(text){
	return {
		type: EDIT_NAME,
		text
	};
};

const editAge = function(text){
	return {
		type: EDIT_AGE,
		text
	};
};

const editStatus = function(text){
	return {
		type: EDIT_STATUS,
		text
	};
};

// create reducers, state is { name, status, age }
const stateKey = 'test';
var initialState = {
	name: '--',
	status: '--',
	age: '--'
};
if (localStorage.getItem(stateKey) != null){
	initialState = JSON.parse(localStorage.getItem(stateKey));
}

const reducer = function(state=initialState, action){
	var data = state;
	switch(action.type){
		case EDIT_NAME:
			data = Object.assign({}, state, {"name": action.text});
			break;
		case EDIT_AGE:
			data = Object.assign({}, state, {"age": action.text});
			break;
		case EDIT_STATUS:
			data = Object.assign({}, state, {"status": action.text});
			break;
	}
	localStorage.setItem(stateKey, JSON.stringify(data));
	return data;
};

// create store
let store = createStore(reducer);

// create component
class TestApp extends React.Component{
	constructor(props){
		super(props);
	}
	handleChange(event){
		var name = event.target.name;
		var value = event.target.value;
		const { dispatch } = this.props; // same with dispatch = this.props.dispatch
		if(name == 'name'){
			dispatch(editName(value));
		}	
		else if(name == 'age'){
			dispatch(editAge(value));
		}
		else if(name == 'status'){
			dispatch(editStatus(value));
		}
	}
    render(){
    	const { data } = this.props;
        return (
            <div>
                <label>Name:</label><input onChange={this.handleChange.bind(this)} name="name" value={data.name} /><br/>
                <label>age:</label><input onChange={this.handleChange.bind(this)} name="age" value={data.age} /><br/>
                <label>status:</label><input onChange={this.handleChange.bind(this)} name="status" value={data.status} /><br/>
            </div>
        );
    }
}

TestApp.propTypes = {
	data: PropTypes.object.isRequired,
};

// connect store and component
const select = function(state){
	return {data: state};
};

TestApp = connect(select)(TestApp);

// render
ReactDOM.render(
	<Provider store={store}><TestApp/></Provider>, 
	document.getElementById('root')
);