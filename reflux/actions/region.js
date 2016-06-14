import Reflux from "reflux";
import $ from "jquery";


const RegionActions = Reflux.createActions({
	fetch: {children: ['completed', 'failed']}
});


RegionActions.fetch.listen(function(url, params){
	var defer = $.getJSON(url, params);

	$.when(defer).then(this.completed, this.failed);
});


export { RegionActions };