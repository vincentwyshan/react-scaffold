import $ from "jquery";

export const REGION_REQUEST = 'REGION_REQUEST';
export const REGION_RECEIVE = 'REGION_RECEIVE';
export const REGION_FAIL = 'REGION_FAIL';

export const requestRegion = function(){
	return {
		type: REGION_REQUEST
	};
};

export const receiveRegion = function(data){
	return {
		type: REGION_RECEIVE,
		data
	};
};

export const fetchRegion = function(url, params){
	return function(dispatch){
		dispatch(requestRegion());

		var defer = $.getJSON(url, params);
		return new Promise(function(resolve, reject){
			$.when(defer).then(
				response => { 
					resolve(dispatch(receiveRegion(response.data))); 
				},
				(jqXHR, error) => { 
					console.log('error'); 
				}
			);
		});
	};
};