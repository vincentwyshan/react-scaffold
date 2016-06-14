import Reflux from "reflux";

import { RegionActions } from "../actions/region.js";


export const RegionStore = Reflux.createStore({
	listenables: [ RegionActions ],
	init: function(){
	},
	onFetch: function(){
		this.trigger({
			data: [],
			status: 'PENDING'
		});
	},
	onFetchCompleted: function(response){
		this.trigger({
			data: response.data,
			status: 'SUCCESS'
		});
	},
	onFetchFailed: function(jqXHR){
		this.trigger({
			data: [],
			status: 'ERROR'
		});
	},
	getInitialState: function(){
		return {
			data: [],
			status: 'SUCCESS'
		};
	}
});

