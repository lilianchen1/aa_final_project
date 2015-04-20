NoPhenotype.Views.UnansweredQuestions = Backbone.View.extend({
  template: JST["unanswered_questions"],

  events: {
    "click a":"removeMakeGreen"
  },

  removeMakeGreen: function() {
    $("a").removeClass("make-green");
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.getUnanswered();
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

});
