/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
	'use strict';

	app.TodoView = Backbone.View.extend({
		tagName: 'li',

		template: _.template( $('#item-template').html() ),

		events:{
			'click .toggle': 'toggleCompleted',
			'dblclick label': 'edit',
			'click .destroy': 'clear',
			'keypress .edit': 'updateOnEnter',
			'keydown .edit': 'revertOnEscape',
			'blur .edit': 'close'
		},

		initialize:function(){
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'visible', this.toggleVisible);
		},

		render:function(){
			this.$el.html(this.template( this.model.toJSON() ));
			this.$el.toggleClass('completed',this.model.get('completed') );
			this.toggleVisible();

			this.$input = this.$('.edit');
			return this;
		},
		
		toggleVisible:function(){
			this.$el.toggleClass('hidden', this.isHidden() );
		},

		isHidden: function(){
			var isCompleted = this.model.get('completed');
			return( (!isCompleted && app.TodoFilter === 'completed')
					|| (isCompleted && app.TodoFilter === 'active') );
		},

		toggleCompleted:function(){
			this.model.toggle();
		},

		edit:function(){
			this.$el.addClass('editing');
			this.$input.focus();
		},

		close:function(){
			var value = this.$input.val();
			var trimmedValue = value.trim();
			if (!this.$el.hasClass('editing')) {
				return;
			}

			if (trimmedValue){
				this.model.save({title: value});
				if (value !== trimmedValue) {
					// Model values changes consisting of whitespaces only are
					// not causing change to be triggered Therefore we've to
					// compare untrimmed version with a trimmed one to check
					// whether anything changed
					// And if yes, we've to trigger change event ourselves
					this.model.trigger('change');
				}
			}else{
				this.clear();
			}
			this.$el.removeClass('editing');
		},

		updateOnEnter:function(e){
			if(e.which === ENTER_KEY){
				this.close();
			}
		},

		clear:function(){
			this.model.destroy();
		},

		revertOnEscape: function (e) {
			if (e.which === ESC_KEY) {
				this.$el.removeClass('editing');
				// Also reset the hidden input back to the original value.
				this.$input.val(this.model.get('title'));
			}
		},
	});
})(jQuery);