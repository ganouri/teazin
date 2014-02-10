/*global define */
'use strict';

define(['underscore','ev','service/api'],function(_, ev,api){
	var State = function(){
			var _this = this;
			this.token = '';
			this.base = {};
			this.resc = {};
			this.contacts = {};
			this.rooms = {};
			this.media = {};
			var steps;


			this.updateContacts = function(){
				var leftOver = [];
				_.each(_this.base.contacts,function(val,key) {
					if(!_this.contacts[key]){
						leftOver.push(key);
					}
				});

				_this.contacts = _.omit(_this.base.contacts,
					_.difference(_.keys(_this.contacts), _.keys(_this.base.contacts)));

				steps++;
				api.getContacts(leftOver,function(err,payload){
					_.each(payload,function(val,key) {
						_this.contacts[key] = val;
					});

					_.each(_this.contacts,function(val,key) {
						_this.base.contacts[key] = _.extend(_this.base.contacts[key],val);
						_this.base.contacts[key]._id = key;
					});
					_this.done('updateContacts');
				});
			};

			this.updateRooms = function(){
				var leftOver = [];
				_.each(_this.base.rooms,function(val,key) {
					if(!_this.rooms[key]){
						leftOver.push(key);
					}
				});

				_this.rooms = _.omit(_this.base.rooms,
					_.difference(_.keys(_this.rooms), _.keys(_this.base.rooms)));

				steps++;
				api.getRooms(leftOver,function(err,payload){
					_.each(payload,function(val,key) {
						_this.rooms[val._id] = val;
					});
					_.each(_this.rooms,function(val,key) {
						_this.base.rooms[val._id] = _.extend(_this.base.rooms[val._id],val);
					});
					_this.done('updateRooms');
				});
			};

			this.updateResources = function(){
				var leftOver = [];
				var leftOverMap = {};
				
				_.each(_this.base.rooms,function(val,rkey) {
					_.each(_this.base.rooms[rkey].corr,function(val,ckey) {
						if(!_this.resc[val.resourceId]){
							leftOver.push(val.resourceId);
						}
					});
				});

				steps++;
				api.getResources(leftOver,function(err,payload){
					console.log('cb resources : ',payload)
					_.each(payload,function(val,key) {
						val = _.extend({ // GUIGUI check that, looks weird
							controls:[],
							log:[],
						},val);
						_.each(val.controls, function(item){
							if(!item.unlocked){item.unlocked = [];}
						});
						_this.resc[val._id] = val;
					});
					_this.done('updateResources');
				});
			};

			this.updateBase = function(newBase){
				_this.base = newBase;
				_this.updateContacts();
				_this.updateRooms();
				_this.updateResources();
			};

			this.done = function(what){
				console.log('state: done with '+what);
				if(steps){
					steps--;
				} else {
					console.log('service/state: done. fire baseUpdated');
					ev.fire('baseUpdated');
				}
			};

			api.updateState(this);
		};

	return new State();
});