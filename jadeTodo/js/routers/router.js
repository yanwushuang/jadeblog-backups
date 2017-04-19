/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	var TodoRouter = Backbone.Router.extend({
		routes: {
			'*filter': 'setFilter'
		},

		setFilter: function (param) {
			// Set the current filter to be used
			app.TodoFilter = param || '';

			// Trigger a collection filter event, causing hiding/unhiding
			// of Todo view items
			app.Todos.trigger('filter');
			// window.app.Todos.trigger('filter');
		}
	});

	app.TodoRouter = new TodoRouter();
	Backbone.history.start();
})();
