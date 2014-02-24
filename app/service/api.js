/*global define */
'use strict';

define(['jquery', 'md5', 'options'], function($, md5, opts){

	var state;

	var API = function(){
		var _this = this;
		var url   = opts.url;

		this.updateState = function(set){
			state = set;
			console.log('service/api: updateState', state);
		};

		this.signup = function(nickname,email,password,cb){
			var user = {nickname:nickname,email:email,password:password};
			$.post(url+'signup',user, function(sres){
				var res  = JSON.parse(sres);
				cb(res.errors,res.payload);
			});
		};

		this.login = function(email,password,cb){
			console.log('service/api: login');
			var hash = md5(':'+email+':'+md5(password)+':');
			$.post(url+'login',{authHash:hash,user:email}, function(sres){
				var res  = JSON.parse(sres);
				state.token = res.payload;
				_this.mediaURI = url+'secure/'+state.token+'/media/';
				cb(res.errors,res.payload);
			})
			.fail(function(e) {
				console.log('error:', JSON.stringify(e));
			});
		};

		this.update = function(cb) {
			$.get(url+'secure/'+state.token, function(res){
				state.updateBase(res.payload);
				cb(res.errors,res.payload);
			});
		};

		this.updateUser = function(data,cb) {
			$.post(url+'secure/'+state.token+'/update/', data, function(res){
				_this.update(function(){});
				cb(res.errors,res.payload);
			});
		};

		this.addContact = function(email,cb) {
			$.get(url+'secure/'+state.token+'/contact/add/'+email,function(res){
				_this.update(function(){});
				cb(res.errors,res.payload);
			});
		};
		this.inviteContact = function(email,cb) {
			$.get(url+'secure/'+state.token+'/contact/invite/'+email,function(res){
				_this.update(function(){});
				cb(res.errors,res.payload);
			});
		};

		this.getRoomId = function(members,cb){
			var memberString = members.join(':');
			$.get(url+'secure/'+state.token+'/room/'+memberString, function(res){
				_this.update(function(){});
				cb(res.errors,res.payload._id);
			});
		};
		this.getContacts = function(list,cb) {
			$.post(url+'secure/'+state.token+'/contacts', list, function(res){
				cb(res.errors,res.payload);
			});

		};
		this.getRooms = function(list,cb) {
			$.post(url+'secure/'+state.token+'/rooms', list, function(res){
				cb(res.errors,res.payload);
			});

		};
		this.getResources = function(list,cb) {
			$.post(url+'secure/'+state.token+'/resources', list, function(res){
				cb(res.errors,res.payload);
			});
		};
		this.updateRoomOpenedTime = function(roomId,cb){
			$.post(url+'secure/'+state.token+'/room/'+roomId+'/updateOpenedTime/', function(res){
				cb(res.errors,res.payload);
			});
		};
		this.createResc = function(resc,cb){
			$.post(url+'secure/'+state.token+'/resource/', resc, function(res){
				cb(res.errors,res.payload);
			});
		};
	    this.composeResc = function(roomId,resc,cb){
	    	$.post(url+'secure/'+state.token+'/room/'+roomId+'/resource/', resc, function(res){
				_this.update(function(){
					cb(res);
				});
		    });
		};
	    this.updateResc = function(roomId,resc,cb){
	    	$.post(url+'secure/'+state.token+'/room/'+roomId+'/resource/'+resc._id, resc, function(res){
				_this.update(function(){
					cb(res);
				});
		    });
		};
		this.associateResc = function(rescId,roomId,cb){
			$.get(url+'secure/'+state.token+'/room/'+roomId+'/asc/'+rescId, function(res){
				cb(res.errors,res.payload);
			});
		};

		this.getMediaId = function(cb){
			$.get(_this.mediaURI, function(res){
				cb(res.errors,res.payload);
			});
		};

		this.uploadMedia = function(roomId,rescId,mediaId,imageBuffer,cb){
			//var image = require('fs').readFileSync(fileName);
			//var imageBuffer = new Buffer(image, 'binary');
			$.request({
				method: 'POST',
				uri: url+'/secure/'+state.token+'/room/'+roomId +'/resource/'+rescId+'/media/'+mediaId,
				headers: {'content-type': 'multipart/form-data'},
				multipart: [{
					'Content-Disposition': 'form-data; name="my_file"; filename="flower.jpg"',
					'Content-Type': 'image/jpeg',
					'Content-Transfer-Encoding': 'base64',
					body: imageBuffer
				}]
			}, function(res){
				cb(res.errors,res.payload);
			});

		};

		this.downloadMedia = function(roomId,rescId,mediaId,cb){
			$.get(url+'/secure/'+state.token+'/room/'+roomId+'/resource/'+rescId+'/media/'+mediaId, function(res) {
				cb(res.errors,res.payload);
			});
		};

		this.signMedia = function(fileName,cb){
			$.get(url+'secure/'+state.token+'/media/'+fileName+'/signMedia/', function(res){
				cb(res.payload);
			});
		};

		return this;
	};

	return new API();
});