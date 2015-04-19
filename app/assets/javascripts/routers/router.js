NoPhenotype.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.questions = options.questions;
    this.tags = new NoPhenotype.Collections.Tags();
    this.users = new NoPhenotype.Collections.Users();
    var headerView = new NoPhenotype.Views.HeaderView({
      collection: this.questions
    });
    this.$header = $("div#backbone-header");
    $("div.nav-bar").append(headerView.render().$el);
  },

  routes: {
    "": "index",
    "questions/new": "new",
    "questions/:id": "show",
    "questions/:id/edit": "edit",
    "unanswered": "unanswered",
    "tags": "tagIndex",
    "tags/:id": "tagShow",
    "users": "usersIndex",
    "users/:id": "userShow"
  },

  unanswered: function() {
    this.questions.fetch();
    var unansweredView = new NoPhenotype.Views.UnansweredQuestions({
      collection: this.questions
    });
    this._swapView(unansweredView);
  },

  usersIndex: function() {
    this.users.fetch();
    var usersIndex = new NoPhenotype.Views.UsersIndex({collection: this.users});
    this._swapView(usersIndex);
  },

  userShow: function(id) {
    var user = this.users.getOrFetch(id);
    var userShow = new NoPhenotype.Views.UserShow({model: user});
    this._swapView(userShow);
  },

  tagShow: function(id) {
    var tag = this.tags.getOrFetch(id);
    var tagShow = new NoPhenotype.Views.TagShow({model: tag});
    this._swapView(tagShow);
  },

  tagIndex: function() {
    this.tags.fetch();
    var tagIndexView = new NoPhenotype.Views.TagsIndex({
      collection: this.tags
    });
    this._swapView(tagIndexView);
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

  edit: function(id) {
    var question = this.questions.getOrFetch(id);
    var editView = new NoPhenotype.Views.QuestionForm({
      model: question,
      collection: this.questions
    });

    this._swapView(editView);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
