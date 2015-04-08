NoPhenotype.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    var headerView = new NoPhenotype.Views.HeaderView();
    this.$header = $("div#backbone-header");
    this.$header.html(headerView.render().$el);
    this.$rootEl = options.$rootEl;
    this.questions = options.questions;
    this.tags = new NoPhenotype.Collections.Tags();
  },

  routes: {
    "": "index",
    "questions/new": "new",
    "questions/:id": "show",
    "tags/:id": "tagShow"
  },

  tagShow: function(id) {
    var tag = this.tags.getOrFetch(id);
    var tagShow = new NoPhenotype.Views.TagShow({model: tag});
    this._swapView(tagShow);
  },

  index: function() {
    this.questions.fetch();
    var indexView = new NoPhenotype.Views.QuestionsIndex({
      collection: this.questions
    });
    this._swapView(indexView);
  },

  new: function() {
    var question = new NoPhenotype.Models.Question();
    var newView = new NoPhenotype.Views.QuestionForm({
      model: question,
      collection: this.questions
    });

    this._swapView(newView);
  },

  show: function(id) {
    var question = this.questions.getOrFetch(id);
    var showView = new NoPhenotype.Views.QuestionShow({
      model: question
    });

    this._swapView(showView);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
