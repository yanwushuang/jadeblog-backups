/*global Backbone */
var app = app || {};

(function () {
	'use strict';
	
	var TodoList = Backbone.Collection.extend({
		model: app.Todo,

		localStorage: new Backbone.LocalStorage('todos-backbone'),

		completed:function(){
			return this.filter(function(todo){
				return todo.get('completed');
				// return this.where({completed: true});
			});
		},

		remaining: function(){
			// alert(this);
			return this.without.apply(this, this.completed());
			//return this.where({completed: false});
		},

		nextOrder:function(){
			if(!this.length){
				return 1;
			}

			return this.last().get('order')+1;
		},

		/*comparator: function(todo){
			return todo.get('order');
		}*/
		comparator: 'order'
	});

	app.Todos = new TodoList(); 
})();
