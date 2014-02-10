/*global define */
'use strict';

define(['ev','knockout'],function(ev,ko){
	return function(){
		var _this = this;
		this.state = ko.observable(0);
		this.user = ko.observable({
			userId:'',
			token:'',
			auth:false
		});

	};
});