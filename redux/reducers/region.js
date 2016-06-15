import { REGION_REQUEST, REGION_RECEIVE, REGION_FAIL } from '../actions/region.js';

const region = {
	data: [],
	status: 'SUCCESS'
};

export const regionReducer = function(state=region, action){
	switch(action.type){
		case REGION_REQUEST:
			return Object.assign({}, state, {"status": 'PENDING'});
		case REGION_RECEIVE:
			return Object.assign({}, state, {"status": 'SUCCESS', "data": action.data});
		default:
			return state;
	}
};