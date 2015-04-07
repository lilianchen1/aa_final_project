NoPhenotype.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.questions = options.questions;
  },

  routes: {
    "": "index",
    "questions/new": "new",
    "questions/:id": "show"
  },

  index: function() {

  },

  new: function() {

  },

  show: function(id) {
    
  },

  _swapView: function() {

  }
});
