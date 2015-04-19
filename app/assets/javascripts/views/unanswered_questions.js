NoPhenotype.Views.UnansweredQuestions = Backbone.View.extend({
  template: JST["unanswered_questions"],

  initialize: function() {
    // this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.getUnanswered();
    this.listenForScroll();
    return this;
  },

  getUnanswered: function() {
    this.unanswered = new NoPhenotype.Collections.Questions();
    this.unanswered.order_by_popularity();
    this.listenTo(this.unanswered, "sync", this.renderUnanswered());
    this.unanswered.fetch({
      data: {unanswered: true},
      success: function() {
        this.renderUnanswered();
      }.bind(this)
    });
  },

  renderUnanswered: function() {
    this.$("ul.questions-index").empty();
    for (var i = 0; i < this.unanswered.length; i++) {
      var questionIndexView = new NoPhenotype.Views.QuestionIndexItem({model: this.unanswered.at(i)});
      this.$("ul.questions-index").append(questionIndexView.render().$el);

    }
  },

  listenForScroll: function() {
    $(window).off("scroll"); // remove previous listeners
    var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
    $(window).on("scroll", throttledCallback);
  },

  nextPage: function () {
    if (this.unanswered.page === this.unanswered.total_pages) {
      return;
    }
    var view = this;
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
      if (view.collection.page < view.unanswered.total_pages) {
        view.unanswered.fetch({
          data: {unanswered: true, page: view.unanswered.page + 1},
          remove: false
        });
      }
    }
  }

});
